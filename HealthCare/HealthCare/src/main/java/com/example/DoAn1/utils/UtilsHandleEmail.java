package com.example.DoAn1.utils;

import java.util.Random;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;

import com.example.DoAn1.exception.ExceptionCode;
import com.example.DoAn1.exception.ExceptionUser;
import com.example.DoAn1.repository.UserRepository;
import com.example.DoAn1.response.ResponseCode;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data

@Component
public class UtilsHandleEmail {

    @Autowired
    private JavaMailSender javaMailSender; // use an object of the lib of mail in maven.
    @Value("${spring.mail.username}")
    private String sender; // get sender from file application.properties

    private String recipient;
    private String msgBody;
    private String subject;

    // send HTML email
    public ResponseCode sendHtmlEmail() {
        try {
            MimeMessage mimeMessage = javaMailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");

            helper.setFrom(sender);
            helper.setTo(this.recipient);
            helper.setSubject(this.subject);
            helper.setText(this.msgBody, true); // 'true' indicates that this is an HTML email.

            javaMailSender.send(mimeMessage);
            return ResponseCode.SendEmailSuccessfully;
        } catch (MessagingException e) {
            e.printStackTrace();
            throw new ExceptionUser(ExceptionCode.SendEmailFail);
        }
    }

    // function create Random code
    public String createRandom() {
        Random rd = new Random();
        int x1 = rd.nextInt(9 - 1 + 1) + 1;
        int x2 = rd.nextInt(9 - 0 + 0) + 0;
        int x3 = rd.nextInt(9 - 0 + 0) + 0;
        int x4 = rd.nextInt(9 - 0 + 0) + 0;

        String code = x1 + "" + x2 + "" + x3 + "" + x4;

        return code;
    }

    public String createBodySendEmail(String code) {
        return "<html>\r\n" + //
                "    <head>\r\n" + //
                "        <!--font-->\r\n" + //
                "    <link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\r\n" + //
                "    <link rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\r\n" + //
                "    <link href=\"https://fonts.googleapis.com/css2?family=Itim&display=swap\" rel=\"stylesheet\">\r\n"
                + //
                "    <link href=\"https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Itim&display=swap\" rel=\"stylesheet\">\r\n"
                + //
                "        <style>\r\n" + //
                "            body p{\r\n" + //
                "                font-family: \"Inter\", sans-serif;\r\n" + //
                "                font-optical-sizing: auto;\r\n" + //
                "                font-style: normal;\r\n" + //
                "            }\r\n" + //
                "            *{\r\n" + //
                "                margin: 0;\r\n" + //
                "                padding: 0;\r\n" + //
                "                box-sizing: border-box;\r\n" + //
                "            }\r\n" + //
                "        </style>\r\n" + //
                "    </head>\r\n" + //
                "    <body>\r\n" + //
                "        <div style=\"padding: 10px 10px; box-shadow: 2px 2px 12px gray;\r\n" + //
                "        width: fit-content;\">\r\n" + //
                "            <p style=\"font-weight: 600; font-style: italic  ;\">NOTIFICATION FOR CHANGE PASSWORD</p> <br/>\r\n"
                + //
                "            <p style=\"color: #1445FE;\">You just changed your password in HealthCare website.</p> <br/>\r\n"
                + //
                "            <div style=\"display: flex; gap: 5px;\">\r\n" + //
                "                <p style=\"opacity: 0.5;\">This code is used to confirm to change your password: </p> <br/>\r\n"
                + //
                "                <p style=\"font-weight: 600\">" + code + "</p>\r\n" + //
                "            </div>\r\n" + //
                "            <p style=\"font-style: italic;\">Thank you!</p>\r\n" + //
                "        </div>\r\n" + //
                "    </body>\r\n" + //
                "</html>";
    }
}