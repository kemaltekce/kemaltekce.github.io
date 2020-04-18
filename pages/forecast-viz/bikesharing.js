let csvData = `datetime;target;season;holiday;workingday;prediction;error;window
2012-12-02 00:00:00;117;4;0;0;120;3;1
2012-12-02 01:00:00;94;4;0;0;100;6;1
2012-12-02 02:00:00;74;4;0;0;57;-17;1
2012-12-02 03:00:00;25;4;0;0;27;2;1
2012-12-02 04:00:00;7;4;0;0;10;3;1
2012-12-02 05:00:00;8;4;0;0;10;2;1
2012-12-02 06:00:00;16;4;0;0;14;-2;1
2012-12-02 07:00:00;31;4;0;0;53;22;1
2012-12-02 08:00:00;93;4;0;0;142;49;1
2012-12-02 09:00:00;172;4;0;0;257;85;1
2012-12-02 10:00:00;293;4;0;0;338;45;1
2012-12-02 11:00:00;355;4;0;0;478;123;1
2012-12-02 12:00:00;520;4;0;0;504;-16;1
2012-12-02 13:00:00;431;4;0;0;504;73;1
2012-12-02 14:00:00;473;4;0;0;504;31;1
2012-12-02 15:00:00;417;4;0;0;503;86;1
2012-12-02 16:00:00;443;4;0;0;446;3;1
2012-12-02 17:00:00;303;4;0;0;422;119;1
2012-12-02 18:00:00;203;4;0;0;332;129;1
2012-12-02 19:00:00;174;4;0;0;275;101;1
2012-12-02 20:00:00;154;4;0;0;166;12;1
2012-12-02 21:00:00;99;4;0;0;125;26;1
2012-12-02 22:00:00;96;4;0;0;89;-7;1
2012-12-02 23:00:00;51;4;0;0;66;15;1
2012-12-03 00:00:00;21;4;0;1;27;6;1
2012-12-03 01:00:00;13;4;0;1;13;0;1
2012-12-03 02:00:00;10;4;0;1;6;-4;1
2012-12-03 03:00:00;8;4;0;1;5;-3;1
2012-12-03 04:00:00;5;4;0;1;6;1;1
2012-12-03 05:00:00;38;4;0;1;33;-5;1
2012-12-03 06:00:00;138;4;0;1;112;-26;1
2012-12-03 07:00:00;396;4;0;1;313;-83;1
2012-12-03 08:00:00;731;4;0;1;509;-222;1
2012-12-03 09:00:00;308;4;0;1;280;-28;1
2012-12-03 10:00:00;136;4;0;1;207;71;1
2012-12-03 11:00:00;233;4;0;1;214;-19;1
2012-12-03 12:00:00;268;4;0;1;238;-30;1
2012-12-03 13:00:00;321;4;0;1;238;-83;1
2012-12-03 14:00:00;260;4;0;1;238;-22;1
2012-12-03 15:00:00;268;4;0;1;239;-29;1
2012-12-03 16:00:00;442;4;0;1;370;-72;1
2012-12-03 17:00:00;708;4;0;1;639;-69;1
2012-12-03 18:00:00;692;4;0;1;634;-58;1
2012-12-03 19:00:00;471;4;0;1;417;-54;1
2012-12-03 20:00:00;300;4;0;1;262;-38;1
2012-12-03 21:00:00;221;4;0;1;184;-37;1
2012-12-03 22:00:00;144;4;0;1;125;-19;1
2012-12-03 23:00:00;102;4;0;1;73;-29;1
2012-12-04 00:00:00;55;4;0;1;27;-28;1
2012-12-04 01:00:00;25;4;0;1;11;-14;1
2012-12-04 02:00:00;8;4;0;1;6;-2;1
2012-12-04 03:00:00;4;4;0;1;5;1;1
2012-12-04 04:00:00;7;4;0;1;6;-1;1
2012-12-04 05:00:00;46;4;0;1;32;-14;1
2012-12-04 06:00:00;153;4;0;1;85;-68;1
2012-12-04 07:00:00;502;4;0;1;294;-208;1
2012-12-04 08:00:00;721;4;0;1;513;-208;1
2012-12-04 09:00:00;336;4;0;1;282;-54;1
2012-12-04 10:00:00;156;4;0;1;207;51;1
2012-12-04 11:00:00;207;4;0;1;214;7;1
2012-12-04 12:00:00;312;4;0;1;238;-74;1
2012-12-04 13:00:00;272;4;0;1;238;-34;1
2012-12-04 14:00:00;270;4;0;1;238;-32;1
2012-12-04 15:00:00;300;4;0;1;239;-61;1
2012-12-04 16:00:00;435;4;0;1;368;-67;1
2012-12-04 17:00:00;743;4;0;1;639;-104;1
2012-12-04 18:00:00;731;4;0;1;634;-97;1
2012-12-04 19:00:00;460;4;0;1;420;-40;1
2012-12-04 20:00:00;306;4;0;1;262;-44;1
2012-12-04 21:00:00;280;4;0;1;185;-95;1
2012-12-04 22:00:00;181;4;0;1;142;-39;1
2012-12-04 23:00:00;96;4;0;1;105;9;1
2012-12-05 00:00:00;37;4;0;1;36;-1;1
2012-12-05 01:00:00;11;4;0;1;16;5;1
2012-12-05 02:00:00;9;4;0;1;6;-3;1
2012-12-05 03:00:00;7;4;0;1;5;-2;1
2012-12-05 04:00:00;10;4;0;1;5;-5;1
2012-12-05 05:00:00;49;4;0;1;34;-15;1
2012-12-05 06:00:00;124;4;0;1;122;-2;1
2012-12-05 07:00:00;398;4;0;1;371;-27;1
2012-12-05 08:00:00;759;4;0;1;622;-137;1
2012-12-05 09:00:00;388;4;0;1;288;-100;1
2012-12-05 10:00:00;141;4;0;1;208;67;1
2012-12-05 11:00:00;172;4;0;1;216;44;1
2012-12-05 12:00:00;232;4;0;1;240;8;1
2012-12-05 13:00:00;214;4;0;1;240;26;1
2012-12-05 14:00:00;218;4;0;1;239;21;1
2012-12-05 15:00:00;285;4;0;1;240;-45;1
2012-12-05 16:00:00;377;4;0;1;368;-9;1
2012-12-05 17:00:00;605;4;0;1;639;34;1
2012-12-05 18:00:00;609;4;0;1;633;24;1
2012-12-05 19:00:00;414;4;0;1;420;6;1
2012-12-05 20:00:00;293;4;0;1;268;-25;1
2012-12-05 21:00:00;198;4;0;1;186;-12;1
2012-12-05 22:00:00;105;4;0;1;128;23;1
2012-12-05 23:00:00;74;4;0;1;87;13;1
2012-12-06 00:00:00;44;4;0;1;37;-7;1
2012-12-06 01:00:00;16;4;0;1;17;1;1
2012-12-06 02:00:00;9;4;0;1;7;-2;1
2012-12-06 03:00:00;2;4;0;1;4;2;1
2012-12-06 04:00:00;9;4;0;1;5;-4;1
2012-12-06 05:00:00;32;4;0;1;34;2;1
2012-12-06 06:00:00;124;4;0;1;136;12;1
2012-12-06 07:00:00;389;4;0;1;396;7;1
2012-12-06 08:00:00;659;4;0;1;634;-25;1
2012-12-06 09:00:00;276;4;0;1;289;13;1
2012-12-06 10:00:00;145;4;0;1;211;66;1
2012-12-06 11:00:00;178;4;0;1;218;40;1
2012-12-06 12:00:00;235;4;0;1;240;5;1
2012-12-06 13:00:00;245;4;0;1;240;-5;1
2012-12-06 14:00:00;212;4;0;1;240;28;1
2012-12-06 15:00:00;270;4;0;1;241;-29;1
2012-12-06 16:00:00;331;4;0;1;373;42;1
2012-12-06 17:00:00;617;4;0;1;639;22;1
2012-12-06 18:00:00;565;4;0;1;633;68;1
2012-12-06 19:00:00;373;4;0;1;421;48;1
2012-12-06 20:00:00;227;4;0;1;271;44;1
2012-12-06 21:00:00;191;4;0;1;199;8;1
2012-12-06 22:00:00;133;4;0;1;167;34;1
2012-12-06 23:00:00;93;4;0;1;120;27;1
2012-12-07 00:00:00;48;4;0;1;56;8;1
2012-12-07 01:00:00;28;4;0;1;21;-7;1
2012-12-07 02:00:00;11;4;0;1;11;0;1
2012-12-07 03:00:00;5;4;0;1;5;0;1
2012-12-07 04:00:00;10;4;0;1;6;-4;1
2012-12-07 05:00:00;26;4;0;1;33;7;1
2012-12-07 06:00:00;84;4;0;1;131;47;1
2012-12-07 07:00:00;215;4;0;1;342;127;1
2012-12-07 08:00:00;441;4;0;1;548;107;1
2012-12-07 09:00:00;301;4;0;1;315;14;1
2012-12-07 10:00:00;166;4;0;1;273;107;1
2012-12-07 11:00:00;203;4;0;1;272;69;1
2012-12-07 12:00:00;240;4;0;1;323;83;1
2012-12-07 13:00:00;220;4;0;1;324;104;1
2012-12-07 14:00:00;215;4;0;1;324;109;1
2012-12-07 15:00:00;303;4;0;1;326;23;1
2012-12-07 16:00:00;375;4;0;1;433;58;1
2012-12-07 17:00:00;568;4;0;1;593;25;1
2012-12-07 18:00:00;498;4;0;1;569;71;1
2012-12-07 19:00:00;352;4;0;1;391;39;1
2012-12-07 20:00:00;241;4;0;1;244;3;1
2012-12-07 21:00:00;171;4;0;1;189;18;1
2012-12-07 22:00:00;165;4;0;1;164;-1;1
2012-12-07 23:00:00;122;4;0;1;131;9;1
2012-12-08 00:00:00;103;4;0;0;121;18;1
2012-12-08 01:00:00;100;4;0;0;91;-9;1
2012-12-08 02:00:00;70;4;0;0;55;-15;1
2012-12-08 03:00:00;29;4;0;0;23;-6;1
2012-12-08 04:00:00;12;4;0;0;9;-3;1
2012-12-08 05:00:00;6;4;0;0;10;4;1
2012-12-08 06:00:00;20;4;0;0;21;1;1
2012-12-08 07:00:00;39;4;0;0;78;39;1
2012-12-08 08:00:00;111;4;0;0;182;71;1
2012-12-08 09:00:00;170;4;0;0;286;116;1
2012-12-08 10:00:00;287;4;0;0;344;57;1
2012-12-08 11:00:00;404;4;0;0;500;96;1
2012-12-08 12:00:00;486;4;0;0;530;44;1
2012-12-08 13:00:00;547;4;0;0;530;-17;1
2012-12-08 14:00:00;542;4;0;0;529;-13;1
2012-12-08 15:00:00;541;4;0;0;528;-13;1
2012-12-08 16:00:00;507;4;0;0;463;-44;1
2012-12-08 17:00:00;345;4;0;0;441;96;1
2012-12-08 18:00:00;304;4;0;0;358;54;1
2012-12-08 19:00:00;246;4;0;0;305;59;1
2012-12-08 20:00:00;182;4;0;0;192;10;1
2012-12-08 21:00:00;209;4;0;0;171;-38;1
2012-12-08 22:00:00;160;4;0;0;162;2;1
2012-12-08 23:00:00;162;4;0;0;138;-24;1
2012-12-09 00:00:00;118;4;0;0;118;0;2
2012-12-09 01:00:00;102;4;0;0;95;-7;2
2012-12-09 02:00:00;78;4;0;0;59;-19;2
2012-12-09 03:00:00;48;4;0;0;25;-23;2
2012-12-09 04:00:00;12;4;0;0;8;-4;2
2012-12-09 05:00:00;8;4;0;0;9;1;2
2012-12-09 06:00:00;6;4;0;0;16;10;2
2012-12-09 07:00:00;23;4;0;0;41;18;2
2012-12-09 08:00:00;69;4;0;0;140;71;2
2012-12-09 09:00:00;103;4;0;0;247;144;2
2012-12-09 10:00:00;219;4;0;0;324;105;2
2012-12-09 11:00:00;250;4;0;0;472;222;2
2012-12-09 12:00:00;315;4;0;0;497;182;2
2012-12-09 13:00:00;285;4;0;0;497;212;2
2012-12-09 14:00:00;232;4;0;0;497;265;2
2012-12-09 15:00:00;225;4;0;0;497;272;2
2012-12-09 16:00:00;253;4;0;0;433;180;2
2012-12-09 17:00:00;229;4;0;0;389;160;2
2012-12-09 18:00:00;198;4;0;0;298;100;2
2012-12-09 19:00:00;122;4;0;0;260;138;2
2012-12-09 20:00:00;108;4;0;0;163;55;2
2012-12-09 21:00:00;96;4;0;0;121;25;2
2012-12-09 22:00:00;78;4;0;0;93;15;2
2012-12-09 23:00:00;51;4;0;0;57;6;2
2012-12-10 00:00:00;20;4;0;1;29;9;2
2012-12-10 01:00:00;4;4;0;1;14;10;2
2012-12-10 02:00:00;5;4;0;1;6;1;2
2012-12-10 03:00:00;4;4;0;1;6;2;2
2012-12-10 04:00:00;12;4;0;1;7;-5;2
2012-12-10 05:00:00;27;4;0;1;38;11;2
2012-12-10 06:00:00;123;4;0;1;136;13;2
2012-12-10 07:00:00;294;4;0;1;378;84;2
2012-12-10 08:00:00;584;4;0;1;570;-14;2
2012-12-10 09:00:00;284;4;0;1;297;13;2
2012-12-10 10:00:00;133;4;0;1;204;71;2
2012-12-10 11:00:00;134;4;0;1;211;77;2
2012-12-10 12:00:00;173;4;0;1;241;68;2
2012-12-10 13:00:00;220;4;0;1;241;21;2
2012-12-10 14:00:00;210;4;0;1;241;31;2
2012-12-10 15:00:00;236;4;0;1;243;7;2
2012-12-10 16:00:00;345;4;0;1;385;40;2
2012-12-10 17:00:00;616;4;0;1;652;36;2
2012-12-10 18:00:00;564;4;0;1;651;87;2
2012-12-10 19:00:00;427;4;0;1;428;1;2
2012-12-10 20:00:00;300;4;0;1;286;-14;2
2012-12-10 21:00:00;245;4;0;1;210;-35;2
2012-12-10 22:00:00;126;4;0;1;133;7;2
2012-12-10 23:00:00;84;4;0;1;83;-1;2
2012-12-11 00:00:00;31;4;0;1;30;-1;2
2012-12-11 01:00:00;8;4;0;1;13;5;2
2012-12-11 02:00:00;1;4;0;1;6;5;2
2012-12-11 03:00:00;3;4;0;1;6;3;2
2012-12-11 04:00:00;8;4;0;1;7;-1;2
2012-12-11 05:00:00;41;4;0;1;38;-3;2
2012-12-11 06:00:00;118;4;0;1;124;6;2
2012-12-11 07:00:00;380;4;0;1;369;-11;2
2012-12-11 08:00:00;724;4;0;1;576;-148;2
2012-12-11 09:00:00;334;4;0;1;303;-31;2
2012-12-11 10:00:00;154;4;0;1;204;50;2
2012-12-11 11:00:00;173;4;0;1;211;38;2
2012-12-11 12:00:00;226;4;0;1;241;15;2
2012-12-11 13:00:00;254;4;0;1;240;-14;2
2012-12-11 14:00:00;204;4;0;1;240;36;2
2012-12-11 15:00:00;270;4;0;1;242;-28;2
2012-12-11 16:00:00;358;4;0;1;385;27;2
2012-12-11 17:00:00;601;4;0;1;652;51;2
2012-12-11 18:00:00;546;4;0;1;651;105;2
2012-12-11 19:00:00;433;4;0;1;430;-3;2
2012-12-11 20:00:00;257;4;0;1;286;29;2
2012-12-11 21:00:00;207;4;0;1;214;7;2
2012-12-11 22:00:00;106;4;0;1;147;41;2
2012-12-11 23:00:00;64;4;0;1;97;33;2
2012-12-12 00:00:00;34;4;0;1;37;3;2
2012-12-12 01:00:00;21;4;0;1;16;-5;2
2012-12-12 02:00:00;9;4;0;1;6;-3;2
2012-12-12 03:00:00;10;4;0;1;6;-4;2
2012-12-12 04:00:00;4;4;0;1;7;3;2
2012-12-12 05:00:00;37;4;0;1;39;2;2
2012-12-12 06:00:00;128;4;0;1;132;4;2
2012-12-12 07:00:00;369;4;0;1;416;47;2
2012-12-12 08:00:00;688;4;0;1;660;-28;2
2012-12-12 09:00:00;285;4;0;1;309;24;2
2012-12-12 10:00:00;136;4;0;1;206;70;2
2012-12-12 11:00:00;172;4;0;1;213;41;2
2012-12-12 12:00:00;232;4;0;1;242;10;2
2012-12-12 13:00:00;238;4;0;1;241;3;2
2012-12-12 14:00:00;225;4;0;1;241;16;2
2012-12-12 15:00:00;228;4;0;1;243;15;2
2012-12-12 16:00:00;329;4;0;1;385;56;2
2012-12-12 17:00:00;561;4;0;1;652;91;2
2012-12-12 18:00:00;540;4;0;1;651;111;2
2012-12-12 19:00:00;402;4;0;1;431;29;2
2012-12-12 20:00:00;268;4;0;1;284;16;2
2012-12-12 21:00:00;202;4;0;1;210;8;2
2012-12-12 22:00:00;122;4;0;1;129;7;2
2012-12-12 23:00:00;79;4;0;1;86;7;2
2012-12-13 00:00:00;32;4;0;1;38;6;2
2012-12-13 01:00:00;23;4;0;1;17;-6;2
2012-12-13 02:00:00;8;4;0;1;7;-1;2
2012-12-13 03:00:00;2;4;0;1;6;4;2
2012-12-13 04:00:00;8;4;0;1;7;-1;2
2012-12-13 05:00:00;33;4;0;1;38;5;2
2012-12-13 06:00:00;114;4;0;1;134;20;2
2012-12-13 07:00:00;385;4;0;1;416;31;2
2012-12-13 08:00:00;679;4;0;1;658;-21;2
2012-12-13 09:00:00;325;4;0;1;309;-16;2
2012-12-13 10:00:00;167;4;0;1;209;42;2
2012-12-13 11:00:00;189;4;0;1;215;26;2
2012-12-13 12:00:00;282;4;0;1;242;-40;2
2012-12-13 13:00:00;271;4;0;1;242;-29;2
2012-12-13 14:00:00;242;4;0;1;241;-1;2
2012-12-13 15:00:00;280;4;0;1;243;-37;2
2012-12-13 16:00:00;406;4;0;1;389;-17;2
2012-12-13 17:00:00;550;4;0;1;652;102;2
2012-12-13 18:00:00;466;4;0;1;651;185;2
2012-12-13 19:00:00;348;4;0;1;431;83;2
2012-12-13 20:00:00;241;4;0;1;287;46;2
2012-12-13 21:00:00;213;4;0;1;216;3;2
2012-12-13 22:00:00;148;4;0;1;158;10;2
2012-12-13 23:00:00;120;4;0;1;118;-2;2
2012-12-14 00:00:00;47;4;0;1;56;9;2
2012-12-14 01:00:00;26;4;0;1;22;-4;2
2012-12-14 02:00:00;9;4;0;1;14;5;2
2012-12-14 03:00:00;12;4;0;1;7;-5;2
2012-12-14 04:00:00;10;4;0;1;7;-3;2
2012-12-14 05:00:00;34;4;0;1;36;2;2
2012-12-14 06:00:00;113;4;0;1;131;18;2
2012-12-14 07:00:00;308;4;0;1;345;37;2
2012-12-14 08:00:00;636;4;0;1;540;-96;2
2012-12-14 09:00:00;343;4;0;1;315;-28;2
2012-12-14 10:00:00;190;4;0;1;264;74;2
2012-12-14 11:00:00;211;4;0;1;266;55;2
2012-12-14 12:00:00;273;4;0;1;320;47;2
2012-12-14 13:00:00;313;4;0;1;321;8;2
2012-12-14 14:00:00;299;4;0;1;320;21;2
2012-12-14 15:00:00;309;4;0;1;323;14;2
2012-12-14 16:00:00;417;4;0;1;438;21;2
2012-12-14 17:00:00;622;4;0;1;605;-17;2
2012-12-14 18:00:00;455;4;0;1;590;135;2
2012-12-14 19:00:00;319;4;0;1;398;79;2
2012-12-14 20:00:00;221;4;0;1;246;25;2
2012-12-14 21:00:00;172;4;0;1;203;31;2
2012-12-14 22:00:00;138;4;0;1;154;16;2
2012-12-14 23:00:00;134;4;0;1;129;-5;2
2012-12-15 00:00:00;94;4;0;0;116;22;2
2012-12-15 01:00:00;95;4;0;0;82;-13;2
2012-12-15 02:00:00;69;4;0;0;55;-14;2
2012-12-15 03:00:00;23;4;0;0;22;-1;2
2012-12-15 04:00:00;6;4;0;0;7;1;2
2012-12-15 05:00:00;3;4;0;0;9;6;2
2012-12-15 06:00:00;11;4;0;0;24;13;2
2012-12-15 07:00:00;48;4;0;0;72;24;2
2012-12-15 08:00:00;119;4;0;0;178;59;2
2012-12-15 09:00:00;220;4;0;0;272;52;2
2012-12-15 10:00:00;273;4;0;0;327;54;2
2012-12-15 11:00:00;393;4;0;0;490;97;2
2012-12-15 12:00:00;453;4;0;0;521;68;2
2012-12-15 13:00:00;456;4;0;0;521;65;2
2012-12-15 14:00:00;426;4;0;0;521;95;2
2012-12-15 15:00:00;447;4;0;0;521;74;2
2012-12-15 16:00:00;413;4;0;0;443;30;2
2012-12-15 17:00:00;309;4;0;0;405;96;2
2012-12-15 18:00:00;272;4;0;0;319;47;2
2012-12-15 19:00:00;257;4;0;0;285;28;2
2012-12-15 20:00:00;201;4;0;0;194;-7;2
2012-12-15 21:00:00;184;4;0;0;181;-3;2
2012-12-15 22:00:00;156;4;0;0;152;-4;2
2012-12-15 23:00:00;119;4;0;0;132;13;2
`