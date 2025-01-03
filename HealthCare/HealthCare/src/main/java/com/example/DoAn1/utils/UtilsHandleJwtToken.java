package com.example.DoAn1.utils;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.Optional;

import javax.crypto.spec.SecretKeySpec;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.stereotype.Component;

import com.example.DoAn1.entities.User;
import com.example.DoAn1.exception.ExceptionCode;
import com.example.DoAn1.exception.ExceptionUser;
import com.example.DoAn1.repository.UserRepository;
import com.nimbusds.jose.JWSAlgorithm;
import com.nimbusds.jose.JWSHeader;
import com.nimbusds.jose.JWSObject;
import com.nimbusds.jose.JWSVerifier;
import com.nimbusds.jose.Payload;
import com.nimbusds.jose.crypto.MACSigner;
import com.nimbusds.jose.crypto.MACVerifier;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;

@Component
public class UtilsHandleJwtToken {
    @Value("${jwt.scretKey}")
    private String secretKey;

    public String createToken(User user) {
        JWSHeader header = new JWSHeader(JWSAlgorithm.HS256);
        JWTClaimsSet claim = new JWTClaimsSet.Builder()
                .subject(user.getUserId())
                .issuer("Recommendation Nutition and exercise")
                .issueTime(new Date())
                .expirationTime(new Date(
                        Instant.now().plus(1, ChronoUnit.HOURS).toEpochMilli()))
                .claim("scope", buildScope(user))
                .build();
        Payload payload = new Payload(claim.toJSONObject());
        JWSObject jwsObject = new JWSObject(header, payload);
        try {
            jwsObject.sign(new MACSigner(secretKey.getBytes()));
            return jwsObject.serialize();
        } catch (Exception e) {
            e.printStackTrace();
            throw new ExceptionUser(ExceptionCode.TokenCreationError);
        }
    }

    public String verifyToken(String token) {
        try {
            JWSVerifier verifier = new MACVerifier(this.secretKey.getBytes());
            SignedJWT signedJWT = SignedJWT.parse(token);
            Date expireTime = (Date) signedJWT.getJWTClaimsSet().getExpirationTime();
            if (expireTime.before(new Date())) {
                throw new ExceptionUser(ExceptionCode.VerificationTokenError);
            } else {
                if (signedJWT.verify(verifier)) {
                    return signedJWT.getJWTClaimsSet().getSubject();
                } else {
                    throw new ExceptionUser(ExceptionCode.VerificationTokenError);
                }
            }
        } catch (Exception e) {
            throw new ExceptionUser(ExceptionCode.VerificationTokenError);
        }
    }

    public JwtDecoder jwtDecoder() {
        SecretKeySpec secretKeySpec = new SecretKeySpec(this.secretKey.getBytes(), "HS256");
        return NimbusJwtDecoder.withSecretKey(secretKeySpec)
                .macAlgorithm(MacAlgorithm.HS256)
                .build();
    }

    public String buildScope(User user) {
        return "ROLE_" + user.getRole();
    }
}
