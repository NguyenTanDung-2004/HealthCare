// package com.example.DoAn1.utils;

// import com.example.DoAn1.Model.DayMonthYear;
// import java.util.Date;
// import java.time.zone.*;
// import java.util.LocalDate;

// public class UtilsHandleDate {
// public DayMonthYear getCurrentDayMonthYear() {
// Date date = new Date();
// LocalDate localDate =
// date.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
// return DayMonthYear.builder()
// .day(localDate.getDayOfMonth())
// .month(localDate.getMonthValue())
// .year(localDate.getYear())
// .build();
// }
// }
