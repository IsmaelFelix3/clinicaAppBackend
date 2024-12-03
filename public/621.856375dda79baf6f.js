"use strict";(self.webpackChunkcliniva=self.webpackChunkcliniva||[]).push([[621],{4941:(v,Z,e)=>{e.d(Z,{M:()=>u});var t=e(5879),s=e(6903),n=e(4414),r=e(2296),g=e(617),l=e(4104);const a=["chart"],c=function(){return[]};let u=(()=>{class o{constructor(){}ngOnInit(){this.chart1(),this.chart2(),this.chart3(),this.chart4()}chart1(){this.areaChartOptions={series:[{name:"New Patients",data:[31,40,28,51,42,85,77]},{name:"Old Patients",data:[11,32,45,32,34,52,41]}],chart:{height:350,type:"area",toolbar:{show:!1},foreColor:"#9aa0ac"},colors:["#7D4988","#66BB6A"],dataLabels:{enabled:!1},stroke:{curve:"smooth"},xaxis:{type:"datetime",categories:["2018-09-19T00:00:00.000Z","2018-09-19T01:30:00.000Z","2018-09-19T02:30:00.000Z","2018-09-19T03:30:00.000Z","2018-09-19T04:30:00.000Z","2018-09-19T05:30:00.000Z","2018-09-19T06:30:00.000Z"]},legend:{show:!0,position:"top",horizontalAlign:"center",offsetX:0,offsetY:0},tooltip:{x:{format:"dd/MM/yy HH:mm"}}}}chart2(){this.radialChartOptions={series:[44,55,67],chart:{height:265,type:"radialBar"},plotOptions:{radialBar:{dataLabels:{name:{fontSize:"22px"},value:{fontSize:"16px"},total:{show:!0,label:"Total",formatter:function(){return"249"}}}}},colors:["#ffc107","#3f51b5","#8bc34a"],labels:["Face TO Face","E-Consult","Available"]}}chart3(){this.restRateChartOptions={series:[{name:"Heart Rate",data:[69,75,72,69,75,80,87]}],chart:{height:350,type:"line",dropShadow:{enabled:!0,color:"#000",top:18,left:7,blur:10,opacity:.2},foreColor:"#9aa0ac",toolbar:{show:!1}},colors:["#FCB939"],dataLabels:{enabled:!0},stroke:{curve:"smooth"},markers:{size:1},grid:{show:!0,borderColor:"#9aa0ac",strokeDashArray:1},xaxis:{categories:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],title:{text:"Weekday"}},yaxis:{title:{text:"Heart Rate"}},tooltip:{theme:"dark",marker:{show:!0},x:{show:!0}}}}chart4(){this.performanceRateChartOptions={series:[{name:"Heart Rate",data:[113,120,130,120,125,119,126]}],chart:{height:350,type:"line",dropShadow:{enabled:!0,color:"#000",top:18,left:7,blur:10,opacity:.2},foreColor:"#9aa0ac",toolbar:{show:!1}},colors:["#545454"],dataLabels:{enabled:!0},stroke:{curve:"smooth"},grid:{show:!0,borderColor:"#9aa0ac",strokeDashArray:1},markers:{size:1},xaxis:{categories:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],title:{text:"Weekday"}},yaxis:{title:{text:"Heart Rate"}},tooltip:{theme:"dark",marker:{show:!0},x:{show:!0}}}}static#t=this.\u0275fac=function(d){return new(d||o)};static#i=this.\u0275cmp=t.Xpm({type:o,selectors:[["app-dashboard"]],viewQuery:function(d,i){if(1&d&&t.Gf(a,5),2&d){let T;t.iGM(T=t.CRH())&&(i.chart=T.first)}},decls:602,vars:28,consts:[[1,"content"],[1,"content-block"],[1,"block-header"],[3,"title","items","active_item"],[1,"row"],[1,"col-lg-12"],[1,"card"],[1,"body"],[1,"row","align-items-center"],[1,"col-md-4"],["src","assets/images/pages/welcome.png","alt","",1,"w-100"],[1,"col-md-8"],[1,"font-20","weight-500","mb-2"],[1,"weight-600","font-30","col-blue","pt-1"],[1,"font-16","max-width-600"],[1,"col-lg-3","col-md-3","col-sm-12"],[1,"card","card-statistic-2"],[1,"clearfix"],[1,"card-icon-only","shadow-primary","float-start"],["src","assets/images/pages/blood-pressure.png","alt",""],[1,"card-right"],[1,"float-end"],[1,"col-green"],[1,"font-weight-bold","float-end","mb-0"],[1,"card-content","msl-4","mb-3"],[1,"m-b-0","d-flex"],[1,"material-icons","col-green","psr-2"],["src","assets/images/pages/heart-rate.png","alt",""],[1,"material-icons","col-orange","psr-2"],["src","assets/images/pages/glucose.png","alt",""],["src","assets/images/pages/blood-count.png","alt",""],[1,"col-xl-4","col-lg-4","col-md-12","col-sm-12"],[1,"card-body"],[1,"float-start"],[1,"text-muted"],[1,"text-muted","font-12"],[1,"mb-5"],[3,"series","chart","xaxis","stroke","colors","dataLabels","legend","markers","grid","yaxis","tooltip","title"],[1,"header"],[1,"table-responsive"],[1,"table","table-borderless","medicine-list"],[1,"fas","fa-tablets","pill-style","col-green"],[1,"text-end","w-25"],[1,"badge-outline"],[1,"fas","fa-capsules","pill-style","col-red"],[1,"fas","fa-syringe","pill-style","col-blue"],[1,"fas","fa-pills","pill-style","col-orange"],[1,"fas","fa-capsules","pill-style","col-purple"],[1,"fas","fa-tablets","pill-style","col-teal"],[1,"fas","fa-syringe","pill-style","col-indigo"],[1,"text-center","p-t-20"],["mat-stroked-button","","color","primary"],[1,"row","clearfix"],[1,"col-xs-12","col-sm-12","col-md-8","col-lg-8"],["dynamicHeight",""],["label","Upcoming Appointment"],[1,"list-unstyled","list-unstyled-border","list-unstyled-noborder"],[1,"app-list"],["alt","image","width","40","src","assets/images/user/usrbig1.jpg",1,"rounded-circle"],[1,"set-flex"],[1,"media-title","font-16"],[1,"text-job","text-muted","mb-0"],[1,"media-title","text-muted","mb-0"],[1,"text-job","font-16"],[1,"media-cta"],["mat-icon-button","",1,"col-green"],["mat-icon-button","",1,"col-red"],["alt","image","width","40","src","assets/images/user/usrbig2.jpg",1,"rounded-circle"],["alt","image","width","40","src","assets/images/user/usrbig3.jpg",1,"rounded-circle"],["alt","image","width","40","src","assets/images/user/usrbig4.jpg",1,"rounded-circle"],["alt","image","width","40","src","assets/images/user/usrbig6.jpg",1,"rounded-circle"],["alt","image","width","40","src","assets/images/user/usrbig7.jpg",1,"rounded-circle"],["label","Past Appointment"],[1,"list-unstyled","user-progress","list-unstyled-border","list-unstyled-noborder"],["alt","image","width","40","src","assets/images/user/usrbig8.jpg",1,"rounded-circle"],["alt","image","width","40","src","assets/images/user/usrbig9.jpg",1,"rounded-circle"],["alt","image","width","40","src","assets/images/user/usrbig5.jpg",1,"rounded-circle"],["alt","image","width","40","src","assets/images/user/usrbig10.jpg",1,"rounded-circle"],[1,"col-xs-12","col-sm-12","col-md-4","col-lg-4"],[1,"report-list"],[1,"d-flex"],[1,"far","fa-file-pdf","file-style","col-red","font-20"],[1,"ms-auto"],[1,"far","fa-trash-alt"],[1,"far","fa-arrow-alt-circle-down"],[1,"far","fa-file-word","col-blue","font-20","file-style"],[1,"far","fa-file-alt","col-black","font-20","file-style"],[1,"far","fa-file-archive","col-purple","font-20","file-style"],[1,"far","fa-file-pdf","col-red","font-20","file-style"],[1,"far","fa-file-image","col-teal","font-20","file-style"]],template:function(d,i){1&d&&(t.TgZ(0,"section",0)(1,"div",1)(2,"div",2),t._UZ(3,"app-breadcrumb",3),t.qZA(),t.TgZ(4,"div",4)(5,"div",5)(6,"div",6)(7,"div",7)(8,"div",8)(9,"div",9),t._UZ(10,"img",10),t.qZA(),t.TgZ(11,"div",11)(12,"h4",12),t._uU(13," Welcome back "),t.TgZ(14,"div",13),t._uU(15,"Sarah Smith!"),t.qZA()(),t.TgZ(16,"p",14),t._uU(17,"We would like to take this opportunity to welcome you to our practice and to thank you for choosing our physicians to participate in your healthcare. We look forward to providing you with personalized, comprehensive health care focusing on wellness and prevention."),t.qZA()()()()()()(),t.TgZ(18,"div",4)(19,"div",15)(20,"div",16)(21,"div",17)(22,"div",18),t._UZ(23,"img",19),t.qZA(),t.TgZ(24,"div",20)(25,"div")(26,"h5",21),t._uU(27,"Blood Pressure"),t.qZA()(),t.TgZ(28,"div",22)(29,"h3",23),t._uU(30," 110/70"),t.qZA()()()(),t.TgZ(31,"div",24)(32,"p",25)(33,"i",26),t._uU(34,"trending_up"),t.qZA(),t._uU(35," 10% Higher Then Last Month "),t.qZA()()()(),t.TgZ(36,"div",15)(37,"div",16)(38,"div",17)(39,"div",18),t._UZ(40,"img",27),t.qZA(),t.TgZ(41,"div",20)(42,"div")(43,"h5",21),t._uU(44,"Blood Pressure"),t.qZA()(),t.TgZ(45,"div",22)(46,"h3",23),t._uU(47,"650"),t.qZA()()()(),t.TgZ(48,"div",24)(49,"p",25)(50,"i",28),t._uU(51,"trending_down"),t.qZA(),t._uU(52," 07% Less Then Last Month "),t.qZA()()()(),t.TgZ(53,"div",15)(54,"div",16)(55,"div",17)(56,"div",18),t._UZ(57,"img",29),t.qZA(),t.TgZ(58,"div",20)(59,"div")(60,"h5",21),t._uU(61,"Glucose Level"),t.qZA()(),t.TgZ(62,"div",22)(63,"h3",23),t._uU(64,"88-75"),t.qZA()()()(),t.TgZ(65,"div",24)(66,"p",25)(67,"i",26),t._uU(68,"trending_up"),t.qZA(),t._uU(69," 12% Higher Then Last Month "),t.qZA()()()(),t.TgZ(70,"div",15)(71,"div",16)(72,"div",17)(73,"div",18),t._UZ(74,"img",30),t.qZA(),t.TgZ(75,"div",20)(76,"div")(77,"h5",21),t._uU(78,"Blood Count"),t.qZA()(),t.TgZ(79,"div",22)(80,"h3",23),t._uU(81,"9,456/mL"),t.qZA()()()(),t.TgZ(82,"div",24)(83,"p",25)(84,"i",28),t._uU(85,"trending_down"),t.qZA(),t._uU(86," 22% Less Then Last Month "),t.qZA()()()()(),t.TgZ(87,"div",4)(88,"div",31)(89,"div",6)(90,"div",32)(91,"div",33)(92,"h6",34),t._uU(93,"Resting Heart Rate"),t.qZA(),t.TgZ(94,"h5"),t._uU(95,"72 bmp "),t.TgZ(96,"span",35),t._uU(97,"(Average)"),t.qZA()()(),t.TgZ(98,"div",36),t._UZ(99,"apx-chart",37),t.qZA()()()(),t.TgZ(100,"div",31)(101,"div",6)(102,"div",32)(103,"div",33)(104,"h6",34),t._uU(105,"Performance Heart Rate"),t.qZA(),t.TgZ(106,"h5"),t._uU(107,"129 bmp "),t.TgZ(108,"span",35),t._uU(109,"(Average)"),t.qZA()()(),t.TgZ(110,"div",36),t._UZ(111,"apx-chart",37),t.qZA()()()(),t.TgZ(112,"div",31)(113,"div",6)(114,"div",38)(115,"h2"),t._uU(116,"Medications"),t.qZA()(),t.TgZ(117,"div",7)(118,"div",39)(119,"table",40)(120,"tr")(121,"td"),t._UZ(122,"i",41),t._uU(123," Econochlor (chloramphenicol-oral)"),t.qZA(),t.TgZ(124,"td",42)(125,"span",43),t._uU(126,"1 - 0 - 1"),t.qZA()()(),t.TgZ(127,"tr")(128,"td"),t._UZ(129,"i",44),t._uU(130," Desmopressin tabs"),t.qZA(),t.TgZ(131,"td",42)(132,"span",43),t._uU(133,"1 - 1 - 1"),t.qZA()()(),t.TgZ(134,"tr")(135,"td"),t._UZ(136,"i",45),t._uU(137," Abciximab-injection"),t.qZA(),t.TgZ(138,"td",42)(139,"span",43),t._uU(140,"1 Daily"),t.qZA()()(),t.TgZ(141,"tr")(142,"td"),t._UZ(143,"i",46),t._uU(144," Kevzara sarilumab"),t.qZA(),t.TgZ(145,"td",42)(146,"span",43),t._uU(147,"0 - 0 - 1"),t.qZA()()(),t.TgZ(148,"tr")(149,"td"),t._UZ(150,"i",47),t._uU(151," Gentamicin-topical"),t.qZA(),t.TgZ(152,"td",42)(153,"span",43),t._uU(154,"1 - 0 - 1"),t.qZA()()(),t.TgZ(155,"tr")(156,"td"),t._UZ(157,"i",48),t._uU(158," Paliperidone palmitate"),t.qZA(),t.TgZ(159,"td",42)(160,"span",43),t._uU(161,"1 - 1 - 1"),t.qZA()()(),t.TgZ(162,"tr")(163,"td"),t._UZ(164,"i",49),t._uU(165," Sermorelin-injectable"),t.qZA(),t.TgZ(166,"td",42)(167,"span",43),t._uU(168,"1 Daily"),t.qZA()()()()(),t.TgZ(169,"div",50)(170,"button",51),t._uU(171,"Report Adverse Effect"),t.qZA()()()()()(),t.TgZ(172,"div",52)(173,"div",53)(174,"div",6)(175,"div",7)(176,"mat-tab-group",54)(177,"mat-tab",55)(178,"ul",56)(179,"li",57),t._UZ(180,"img",58),t.TgZ(181,"div",59)(182,"div",60),t._uU(183,"Dr.Cara Stevens"),t.qZA(),t.TgZ(184,"div",61),t._uU(185,"Radiologist"),t.qZA()(),t.TgZ(186,"div",59)(187,"div",60),t._uU(188,"12 June '20"),t.qZA(),t.TgZ(189,"div",61),t._uU(190,"09:00-10:00"),t.qZA()(),t.TgZ(191,"div",59)(192,"div",62),t._uU(193,"Treatement"),t.qZA(),t.TgZ(194,"div",63),t._uU(195,"CT scans"),t.qZA()(),t.TgZ(196,"div",59)(197,"div",62),t._uU(198,"Contact Number"),t.qZA(),t.TgZ(199,"div",63),t._uU(200,"+123 676545655"),t.qZA()(),t.TgZ(201,"div",64)(202,"td")(203,"button",65)(204,"mat-icon"),t._uU(205,"check_circle_outline"),t.qZA()(),t.TgZ(206,"button",66)(207,"mat-icon"),t._uU(208,"highlight_off"),t.qZA()()()()(),t.TgZ(209,"li",57),t._UZ(210,"img",67),t.TgZ(211,"div",59)(212,"div",60),t._uU(213,"Dr.John Doe"),t.qZA(),t.TgZ(214,"div",61),t._uU(215,"Cardiologist"),t.qZA()(),t.TgZ(216,"div",59)(217,"div",60),t._uU(218,"13 June '20"),t.qZA(),t.TgZ(219,"div",61),t._uU(220,"11:00-11:30"),t.qZA()(),t.TgZ(221,"div",59)(222,"div",62),t._uU(223,"Treatement"),t.qZA(),t.TgZ(224,"div",63),t._uU(225,"heart checkup"),t.qZA()(),t.TgZ(226,"div",59)(227,"div",62),t._uU(228,"Contact Number"),t.qZA(),t.TgZ(229,"div",63),t._uU(230,"+123 434656764"),t.qZA()(),t.TgZ(231,"div",64)(232,"td")(233,"button",65)(234,"mat-icon"),t._uU(235,"check_circle_outline"),t.qZA()(),t.TgZ(236,"button",66)(237,"mat-icon"),t._uU(238,"highlight_off"),t.qZA()()()()(),t.TgZ(239,"li",57),t._UZ(240,"img",68),t.TgZ(241,"div",59)(242,"div",60),t._uU(243,"Dr.Airi Satou"),t.qZA(),t.TgZ(244,"div",61),t._uU(245,"Otolaryngologist"),t.qZA()(),t.TgZ(246,"div",59)(247,"div",60),t._uU(248,"12 June '20"),t.qZA(),t.TgZ(249,"div",61),t._uU(250,"09:15-10:15 "),t.qZA()(),t.TgZ(251,"div",59)(252,"div",62),t._uU(253,"Treatement"),t.qZA(),t.TgZ(254,"div",63),t._uU(255,"Diseases Of The Ear"),t.qZA()(),t.TgZ(256,"div",59)(257,"div",62),t._uU(258,"Contact Number"),t.qZA(),t.TgZ(259,"div",63),t._uU(260,"+123 45345673"),t.qZA()(),t.TgZ(261,"div",64)(262,"td")(263,"button",65)(264,"mat-icon"),t._uU(265,"check_circle_outline"),t.qZA()(),t.TgZ(266,"button",66)(267,"mat-icon"),t._uU(268,"highlight_off"),t.qZA()()()()(),t.TgZ(269,"li",57),t._UZ(270,"img",69),t.TgZ(271,"div",59)(272,"div",60),t._uU(273,"Dr.Angelica Ramos"),t.qZA(),t.TgZ(274,"div",61),t._uU(275,"Dentist"),t.qZA()(),t.TgZ(276,"div",59)(277,"div",60),t._uU(278,"12 June '20"),t.qZA(),t.TgZ(279,"div",61),t._uU(280,"11:00-12:00"),t.qZA()(),t.TgZ(281,"div",59)(282,"div",62),t._uU(283,"Treatement"),t.qZA(),t.TgZ(284,"div",63),t._uU(285,"Root Canal"),t.qZA()(),t.TgZ(286,"div",59)(287,"div",62),t._uU(288,"Contact Number"),t.qZA(),t.TgZ(289,"div",63),t._uU(290,"+123 87654533"),t.qZA()(),t.TgZ(291,"div",64)(292,"td")(293,"button",65)(294,"mat-icon"),t._uU(295,"check_circle_outline"),t.qZA()(),t.TgZ(296,"button",66)(297,"mat-icon"),t._uU(298,"highlight_off"),t.qZA()()()()(),t.TgZ(299,"li",57),t._UZ(300,"img",70),t.TgZ(301,"div",59)(302,"div",60),t._uU(303,"Dr.Jens Brincker"),t.qZA(),t.TgZ(304,"div",61),t._uU(305,"Endocrinologist"),t.qZA()(),t.TgZ(306,"div",59)(307,"div",60),t._uU(308,"23 June '20"),t.qZA(),t.TgZ(309,"div",61),t._uU(310,"04:00-05:00"),t.qZA()(),t.TgZ(311,"div",59)(312,"div",62),t._uU(313,"Treatement"),t.qZA(),t.TgZ(314,"div",63),t._uU(315,"Diabetes"),t.qZA()(),t.TgZ(316,"div",59)(317,"div",62),t._uU(318,"Contact Number"),t.qZA(),t.TgZ(319,"div",63),t._uU(320,"+123 45678345"),t.qZA()(),t.TgZ(321,"div",64)(322,"td")(323,"button",65)(324,"mat-icon"),t._uU(325,"check_circle_outline"),t.qZA()(),t.TgZ(326,"button",66)(327,"mat-icon"),t._uU(328,"highlight_off"),t.qZA()()()()(),t.TgZ(329,"li",57),t._UZ(330,"img",71),t.TgZ(331,"div",59)(332,"div",60),t._uU(333,"Dr.Airi Satou"),t.qZA(),t.TgZ(334,"div",61),t._uU(335,"Otolaryngologist"),t.qZA()(),t.TgZ(336,"div",59)(337,"div",60),t._uU(338,"12 June '20"),t.qZA(),t.TgZ(339,"div",61),t._uU(340,"09:15-10:15 "),t.qZA()(),t.TgZ(341,"div",59)(342,"div",62),t._uU(343,"Treatement"),t.qZA(),t.TgZ(344,"div",63),t._uU(345,"Diseases Of The Ear"),t.qZA()(),t.TgZ(346,"div",59)(347,"div",62),t._uU(348,"Contact Number"),t.qZA(),t.TgZ(349,"div",63),t._uU(350,"+123 45345673"),t.qZA()(),t.TgZ(351,"div",64)(352,"td")(353,"button",65)(354,"mat-icon"),t._uU(355,"check_circle_outline"),t.qZA()(),t.TgZ(356,"button",66)(357,"mat-icon"),t._uU(358,"highlight_off"),t.qZA()()()()()()(),t.TgZ(359,"mat-tab",72)(360,"ul",73)(361,"li",57),t._UZ(362,"img",71),t.TgZ(363,"div",59)(364,"div",60),t._uU(365,"Dr.Jens Brincker"),t.qZA(),t.TgZ(366,"div",61),t._uU(367,"Endocrinologist"),t.qZA()(),t.TgZ(368,"div",59)(369,"div",60),t._uU(370,"23 June '20"),t.qZA(),t.TgZ(371,"div",61),t._uU(372,"04:00-05:00"),t.qZA()(),t.TgZ(373,"div",59)(374,"div",62),t._uU(375,"Treatement"),t.qZA(),t.TgZ(376,"div",63),t._uU(377,"Diabetes"),t.qZA()(),t.TgZ(378,"div",59)(379,"div",62),t._uU(380,"Contact Number"),t.qZA(),t.TgZ(381,"div",63),t._uU(382,"+123 45678345"),t.qZA()(),t.TgZ(383,"div",64)(384,"td")(385,"button",65)(386,"mat-icon"),t._uU(387,"check_circle_outline"),t.qZA()(),t.TgZ(388,"button",66)(389,"mat-icon"),t._uU(390,"highlight_off"),t.qZA()()()()(),t.TgZ(391,"li",57),t._UZ(392,"img",70),t.TgZ(393,"div",59)(394,"div",60),t._uU(395,"Dr.John Doe"),t.qZA(),t.TgZ(396,"div",61),t._uU(397,"Cardiologist"),t.qZA()(),t.TgZ(398,"div",59)(399,"div",60),t._uU(400,"13 June '20"),t.qZA(),t.TgZ(401,"div",61),t._uU(402,"11:00-11:30"),t.qZA()(),t.TgZ(403,"div",59)(404,"div",62),t._uU(405,"Treatement"),t.qZA(),t.TgZ(406,"div",63),t._uU(407,"heart checkup"),t.qZA()(),t.TgZ(408,"div",59)(409,"div",62),t._uU(410,"Contact Number"),t.qZA(),t.TgZ(411,"div",63),t._uU(412,"+123 434656764"),t.qZA()(),t.TgZ(413,"div",64)(414,"td")(415,"button",65)(416,"mat-icon"),t._uU(417,"check_circle_outline"),t.qZA()(),t.TgZ(418,"button",66)(419,"mat-icon"),t._uU(420,"highlight_off"),t.qZA()()()()(),t.TgZ(421,"li",57),t._UZ(422,"img",74),t.TgZ(423,"div",59)(424,"div",60),t._uU(425,"Dr.Cara Stevens"),t.qZA(),t.TgZ(426,"div",61),t._uU(427,"Radiologist"),t.qZA()(),t.TgZ(428,"div",59)(429,"div",60),t._uU(430,"12 June '20"),t.qZA(),t.TgZ(431,"div",61),t._uU(432,"09:00-10:00"),t.qZA()(),t.TgZ(433,"div",59)(434,"div",62),t._uU(435,"Treatement"),t.qZA(),t.TgZ(436,"div",63),t._uU(437,"CT scans"),t.qZA()(),t.TgZ(438,"div",59)(439,"div",62),t._uU(440,"Contact Number"),t.qZA(),t.TgZ(441,"div",63),t._uU(442,"+123 676545655"),t.qZA()(),t.TgZ(443,"div",64)(444,"td")(445,"button",65)(446,"mat-icon"),t._uU(447,"check_circle_outline"),t.qZA()(),t.TgZ(448,"button",66)(449,"mat-icon"),t._uU(450,"highlight_off"),t.qZA()()()()(),t.TgZ(451,"li",57),t._UZ(452,"img",75),t.TgZ(453,"div",59)(454,"div",60),t._uU(455,"Dr.Airi Satou"),t.qZA(),t.TgZ(456,"div",61),t._uU(457,"Otolaryngologist"),t.qZA()(),t.TgZ(458,"div",59)(459,"div",60),t._uU(460,"12 June '20"),t.qZA(),t.TgZ(461,"div",61),t._uU(462,"09:15-10:15 "),t.qZA()(),t.TgZ(463,"div",59)(464,"div",62),t._uU(465,"Treatement"),t.qZA(),t.TgZ(466,"div",63),t._uU(467,"Diseases Of The Ear"),t.qZA()(),t.TgZ(468,"div",59)(469,"div",62),t._uU(470,"Contact Number"),t.qZA(),t.TgZ(471,"div",63),t._uU(472,"+123 45345673"),t.qZA()(),t.TgZ(473,"div",64)(474,"td")(475,"button",65)(476,"mat-icon"),t._uU(477,"check_circle_outline"),t.qZA()(),t.TgZ(478,"button",66)(479,"mat-icon"),t._uU(480,"highlight_off"),t.qZA()()()()(),t.TgZ(481,"li",57),t._UZ(482,"img",76),t.TgZ(483,"div",59)(484,"div",60),t._uU(485,"Dr.Angelica Ramos"),t.qZA(),t.TgZ(486,"div",61),t._uU(487,"Dentist"),t.qZA()(),t.TgZ(488,"div",59)(489,"div",60),t._uU(490,"12 June '20"),t.qZA(),t.TgZ(491,"div",61),t._uU(492,"11:00-12:00"),t.qZA()(),t.TgZ(493,"div",59)(494,"div",62),t._uU(495,"Treatement"),t.qZA(),t.TgZ(496,"div",63),t._uU(497,"Root Canal"),t.qZA()(),t.TgZ(498,"div",59)(499,"div",62),t._uU(500,"Contact Number"),t.qZA(),t.TgZ(501,"div",63),t._uU(502,"+123 87654533"),t.qZA()(),t.TgZ(503,"div",64)(504,"td")(505,"button",65)(506,"mat-icon"),t._uU(507,"check_circle_outline"),t.qZA()(),t.TgZ(508,"button",66)(509,"mat-icon"),t._uU(510,"highlight_off"),t.qZA()()()()(),t.TgZ(511,"li",57),t._UZ(512,"img",77),t.TgZ(513,"div",59)(514,"div",60),t._uU(515,"Dr.John Doe"),t.qZA(),t.TgZ(516,"div",61),t._uU(517,"Cardiologist"),t.qZA()(),t.TgZ(518,"div",59)(519,"div",60),t._uU(520,"13 June '20"),t.qZA(),t.TgZ(521,"div",61),t._uU(522,"11:00-11:30"),t.qZA()(),t.TgZ(523,"div",59)(524,"div",62),t._uU(525,"Treatement"),t.qZA(),t.TgZ(526,"div",63),t._uU(527,"heart checkup"),t.qZA()(),t.TgZ(528,"div",59)(529,"div",62),t._uU(530,"Contact Number"),t.qZA(),t.TgZ(531,"div",63),t._uU(532,"+123 434656764"),t.qZA()(),t.TgZ(533,"div",64)(534,"td")(535,"button",65)(536,"mat-icon"),t._uU(537,"check_circle_outline"),t.qZA()(),t.TgZ(538,"button",66)(539,"mat-icon"),t._uU(540,"highlight_off"),t.qZA()()()()()()()()()()(),t.TgZ(541,"div",78)(542,"div",6)(543,"div",38)(544,"h2"),t._uU(545,"Reports/Documents"),t.qZA()(),t.TgZ(546,"div",7)(547,"ul",56)(548,"li",79)(549,"div",80),t._UZ(550,"i",81),t.TgZ(551,"div",60),t._uU(552,"Blood Report"),t.qZA()(),t.TgZ(553,"div",82)(554,"td"),t._UZ(555,"i",83)(556,"i",84),t.qZA()()(),t.TgZ(557,"li",79)(558,"div",80),t._UZ(559,"i",85),t.TgZ(560,"div",60),t._uU(561,"Mediclaim Documents"),t.qZA()(),t.TgZ(562,"div",82)(563,"td"),t._UZ(564,"i",83)(565,"i",84),t.qZA()()(),t.TgZ(566,"li",79)(567,"div",80),t._UZ(568,"i",86),t.TgZ(569,"div",60),t._uU(570,"Doctor Prescription"),t.qZA()(),t.TgZ(571,"div",82)(572,"td"),t._UZ(573,"i",83)(574,"i",84),t.qZA()()(),t.TgZ(575,"li",79)(576,"div",80),t._UZ(577,"i",87),t.TgZ(578,"div",60),t._uU(579,"X-Ray Files"),t.qZA()(),t.TgZ(580,"div",82)(581,"td"),t._UZ(582,"i",83)(583,"i",84),t.qZA()()(),t.TgZ(584,"li",79)(585,"div",80),t._UZ(586,"i",88),t.TgZ(587,"div",60),t._uU(588,"Urine Report"),t.qZA()(),t.TgZ(589,"div",82)(590,"td"),t._UZ(591,"i",83)(592,"i",84),t.qZA()()(),t.TgZ(593,"li",79)(594,"div",80),t._UZ(595,"i",89),t.TgZ(596,"div",60),t._uU(597,"Scanned Documents"),t.qZA()(),t.TgZ(598,"div",82)(599,"td"),t._UZ(600,"i",83)(601,"i",84),t.qZA()()()()()()()()()()),2&d&&(t.xp6(3),t.Q6J("title","Dashboard")("items",t.DdM(27,c))("active_item","Dashboard"),t.xp6(96),t.Q6J("series",i.restRateChartOptions.series)("chart",i.restRateChartOptions.chart)("xaxis",i.restRateChartOptions.xaxis)("stroke",i.restRateChartOptions.stroke)("colors",i.restRateChartOptions.colors)("dataLabels",i.restRateChartOptions.dataLabels)("legend",i.restRateChartOptions.legend)("markers",i.restRateChartOptions.markers)("grid",i.restRateChartOptions.grid)("yaxis",i.restRateChartOptions.yaxis)("tooltip",i.restRateChartOptions.tooltip)("title",i.restRateChartOptions.title),t.xp6(12),t.Q6J("series",i.performanceRateChartOptions.series)("chart",i.performanceRateChartOptions.chart)("xaxis",i.performanceRateChartOptions.xaxis)("stroke",i.performanceRateChartOptions.stroke)("colors",i.performanceRateChartOptions.colors)("dataLabels",i.performanceRateChartOptions.dataLabels)("legend",i.performanceRateChartOptions.legend)("markers",i.performanceRateChartOptions.markers)("grid",i.performanceRateChartOptions.grid)("yaxis",i.performanceRateChartOptions.yaxis)("tooltip",i.performanceRateChartOptions.tooltip)("title",i.performanceRateChartOptions.title))},dependencies:[s.x,n.L,r.lW,r.RK,g.Hw,l.uX,l.SP]})}return o})()},4414:(v,Z,e)=>{e.d(Z,{L:()=>l});var t=e(5879),s=e(6814),n=e(1896),r=e(9101);function g(a,c){if(1&a&&(t.TgZ(0,"li",9),t._uU(1),t.qZA()),2&a){const u=c.$implicit;t.xp6(1),t.Oqu(u)}}let l=(()=>{class a{constructor(){}static#t=this.\u0275fac=function(o){return new(o||a)};static#i=this.\u0275cmp=t.Xpm({type:a,selectors:[["app-breadcrumb"]],inputs:{title:"title",items:"items",active_item:"active_item"},decls:12,vars:4,consts:[[1,"row"],[1,"col-xs-12","col-sm-12","col-md-12","col-lg-12"],[1,"breadcrumb"],[1,"page-title"],[1,"breadcrumb-item","bcrumb-1"],[3,"routerLink"],["name","home",1,"breadcrumb-icon"],["class","breadcrumb-item",4,"ngFor","ngForOf"],[1,"breadcrumb-item","active"],[1,"breadcrumb-item"]],template:function(o,_){1&o&&(t.TgZ(0,"div",0)(1,"div",1)(2,"ul",2)(3,"li")(4,"h4",3),t._uU(5),t.qZA()(),t.TgZ(6,"li",4)(7,"a",5),t._UZ(8,"i-feather",6),t.qZA()(),t.YNc(9,g,2,1,"li",7),t.TgZ(10,"li",8),t._uU(11),t.qZA()()()()),2&o&&(t.xp6(5),t.Oqu(_.title),t.xp6(2),t.Q6J("routerLink","/admin/dashboard/main"),t.xp6(2),t.Q6J("ngForOf",_.items),t.xp6(2),t.Oqu(_.active_item))},dependencies:[s.sg,n.rH,r.u]})}return a})()},1858:(v,Z,e)=>{e.d(Z,{K:()=>n});var t=e(121),s=e(5879);let n=(()=>{class r{static#t=this.\u0275fac=function(a){return new(a||r)};static#i=this.\u0275mod=s.oAB({type:r});static#e=this.\u0275inj=s.cJS({imports:[t.m]})}return r})()}}]);