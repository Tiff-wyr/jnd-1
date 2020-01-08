const cardList = [
  {
    id: 0,
    cardImg: 'https://p.51credit.com/bos/ka_img/card/2019/4/30/1556615854198.gif',
    cardName: '招商银行YOUNG版青年卡',
    cardFeature: '刷卡免年费',
    cardLevel: '金卡',
    currencyKind: '人民币',
    issueOrgan: '银联',
    cardAnnualFee: '300元',
    onlyPrivilege: ['每月首笔取现免手续费', '100%的取现额度', '生日月尊享双倍积分'],
    cardAnnualFeePolicy: '刷卡免年费',
    withdraw: '取现手续费为取现金额的1%，最低境内收费10元',
    repayment: '最低还款金额为本月账单的10%，日息0.05%',
    cardEquity: '现金随时取 额度更给力,生日月双倍积分',
    cardTags: '金卡,银联,人民币',
    integralRules: '按实际入账金额单笔每20元人民币/2美元积1分',
    equityDetail: '<ul style="list-style: none; margin: 0; padding: 0; font-size: 16px; line-height: 1.5;"><li><h3>每月首笔取现免手续费</h3></li><li><h3>生日月尊享双倍积分</h3><p>生日月份当月使用YOUNG卡（青年版）进行正常累计我行积分的消费，获得的积分是正常刷卡消费积分的两倍。（主附卡合并进行交易统计，除正常累计积分之外，赠送奖励积分上限为2000分/户，奖励积分将在主卡人生日月的下个月月底前录入主卡人积分账户）</p></li><li><h3>新户刷卡任选缤纷好礼</h3><p>活动期间，成功申请并核发招商银行YOUNG卡的新户主卡持卡人，在卡片核发后的次两个自然月内，任刷该卡3笔，每笔消费满188元，或有任意单笔分期总金额满500元的分期交易，或任意一笔招商银行掌上生活绑卡后还款招行信用卡交易，或任意一笔Apple Pay交易，则可从下列礼品中择一领取：阿尔卑斯拉杆箱或奔腾电动剃须刀</p></li></ul>',
    baseInfoDetail: '<div style="margin: 0; padding: 0; font-size: 16px; line-height: 1.5;"><p>年费政策： 免首年，刷卡6次免次年</p> <p>积分规则： 按实际入账金额单笔每20元人民币/2美元积1分</p> <p>积分有效期： 积分永久有效</p> <p>取现： 取现手续费为取现金额的1%，最低境内收费10元</p> <p>最低还款比例： 10%</p> <p>免息期： 最短20天，最长50天</p> <p>短信通知： 单笔300元以下的境内POS刷卡消费（含快捷支付）不再发送提醒短信，任意金额消费将由官方微信提醒</p> <p>失卡保障： 招商银行信用卡可享受48小时挂失前失卡保障服务</p> <p>申请条件： 主卡申请人如果是本国居民年龄需在18-60周岁之间，如果是境外人士年龄需在25-60周岁之间；附属卡申请人需为主卡人的父母、配偶或子女(年龄在18周岁以上)</p> <p>申请材料： 主卡申请人身份证复印件，境内人士请提供居民身份证复印件。(接受十八岁至六十周岁的境内人士。二十五至六十周岁的外籍人士申请主卡) 境外人士的护照或港澳居民来往内地通行证、港澳同胞回乡证或台湾居民来往大陆通行证复印件及在境内的居留证或暂住证复印件 工作证明文件，如：工作证复印件、工作单位开具的工作证明原件、职称复印件、专业资格证书复印件等 为使您获得更准确的评估和额度，建议提供其他财力证明(如：银行代发工资记录、单位开具的收入证明、所得税扣缴凭证、自有房产证、银行定期存单等资料的复印件)</p></div>',
    correlationCostDetail: '<div style="margin: 0; padding: 0; font-size: 16px; line-height: 1.5;"><p>取现： 取现手续费为取现金额的1%，最低境内收费10元</p><p>还款： 最低还款金额为本月账单的10%，日息0.05%</p><p>违约金： 还款低于最低还款金额的部分需缴5%的违约金，最低收费10元/1美元</p><p>超限费： 超过信用额度的5%</p><p>溢缴费： 存入金额超出欠款的部分，取出时收取0.5%</p><p>挂失费： 60元</p><p>补卡费： 15元</p></div>'
  }, {
    id: 1,
    cardImg: 'https://img.51credit.com/credit/upload/Image/zltp/2017/05/10/1_266001.jpg',
    cardName: '招商银行标准信用卡',
    cardFeature: '小积分享美食',
    cardLevel: '金卡',
    currencyKind: '人民币',
    issueOrgan: '银联',
    cardAnnualFee: '300元',
    onlyPrivilege: [' 刷卡积分永久有效', ' 国内外近万家商户优惠', ' 预借现金，随地可取'],
    cardAnnualFeePolicy: '刷卡免年费',
    withdraw: '最高取现比例50%，取现手续费为取现金额的1%，最低境内收费10元',
    repayment: '最低还款金额为本月账单的10%，日息0.05%',
    cardEquity: '现金随时取 额度更给力,生日月双倍积分',
    cardTags: '金卡,银联,人民币',
    integralRules: '按实际入账金额单笔每20元人民币/2美元积1分',
    equityDetail: '<ul style="list-style: none; margin: 0; padding: 0; font-size: 16px; line-height: 1.5;"><li><h3>刷卡积分永久有效</h3><P>可挑选数百种积分礼品和服务。更可赴招商银行指定积分兑换商户，在刷卡机上刷积分直接兑换指定商品或抵扣部分刷卡金额。</P></li><li><h3>国内外近万家商户优惠</h3><p>不仅可以在全国万家优选商户享受超值优惠，还为您奉上日本、韩国、新加坡、香港等国家和地区的优选商户。</p></li><li><h3>预借现金，随地可取</h3><p>高达固定额度50%的取现额度，境内人民币取现（含电话预借现金）交易还享受低至1%的手续费率（最低10元/笔）。</p></li></ul>',
    baseInfoDetail: '<div style="margin: 0; padding: 0; font-size: 16px; line-height: 1.5;"><p>年费政策： 免首年，刷卡6次免次年</p> <p>积分规则： 按实际入账金额单笔每20元人民币/2美元积1分</p> <p>积分有效期： 积分永久有效</p> <p>取现： 取现手续费为取现金额的1%，最低境内收费10元</p> <p>最低还款比例： 10%</p> <p>免息期： 最短20天，最长50天</p> <p>短信通知： 单笔300元以下的境内POS刷卡消费（含快捷支付）不再发送提醒短信，任意金额消费将由官方微信提醒</p> <p>失卡保障： 招商银行信用卡可享受48小时挂失前失卡保障服务</p> <p>申请条件： 主卡申请人如果是本国居民年龄需在18-60周岁之间，如果是境外人士年龄需在25-60周岁之间；附属卡申请人需为主卡人的父母、配偶或子女(年龄在18周岁以上)</p> <p>申请材料： 主卡申请人身份证复印件，境内人士请提供居民身份证复印件。(接受十八岁至六十周岁的境内人士。二十五至六十周岁的外籍人士申请主卡) 境外人士的护照或港澳居民来往内地通行证、港澳同胞回乡证或台湾居民来往大陆通行证复印件及在境内的居留证或暂住证复印件 工作证明文件，如：工作证复印件、工作单位开具的工作证明原件、职称复印件、专业资格证书复印件等 为使您获得更准确的评估和额度，建议提供其他财力证明(如：银行代发工资记录、单位开具的收入证明、所得税扣缴凭证、自有房产证、银行定期存单等资料的复印件)</p></div>',
    correlationCostDetail: '<div style="margin: 0; padding: 0; font-size: 16px; line-height: 1.5;"><p>取现： 最高取现比例50%，取现手续费为取现金额的1%，最低境内收费10元</p><p>还款： 最低还款金额为本月账单的10%，日息0.05%</p><p>违约金： 还款低于最低还款金额的部分需缴5%的违约金，最低收费10元</p><p>超限费： 超过信用额度的5%</p><p>溢缴费： 存入金额超出欠款的部分，取出时收取0.5%</p><p>挂失费： 60元</p><p>补卡费： 15元</p></div>'
  }, {
    id: 2,
    cardImg: 'https://p.51credit.com/bos/ka_img/card/2019/8/8/1565246426472.jpg',
    cardName: '招商银行愤怒的小鸟小小粉',
    cardFeature: '三款运动的小鸟 萌萌哒',
    cardLevel: '金卡',
    currencyKind: '人民币',
    issueOrgan: '银联',
    cardAnnualFee: '200元',
    onlyPrivilege: [' 随机返现'],
    cardAnnualFeePolicy: '刷卡免年费',
    withdraw: '最高取现比例50%，取现手续费为取现金额的1%，最低境内收费10元',
    repayment: '最低还款金额为本月账单的10%，日息0.05%',
    cardEquity: '现金随时取 额度更给力,生日月双倍积分',
    cardTags: '金卡,银联,人民币',
    integralRules: '按实际入账金额单笔每20元人民币/2美元积1分',
    equityDetail: '<ul style="list-style: none; margin: 0; padding: 0; font-size: 16px; line-height: 1.5;"><li><h3>随机返现</h3><P>即日起至2019年12月31日（含），银联招商银行愤怒的小鸟联名卡持卡人（包括新、旧户）在唯品会官方PC网站、APP消费满10元，并于支付时选择“在线支付”—“愤怒的小鸟联名卡”完成支付，即可享受消费随机返现权益。每户每天返现次数上限为3次，活动期间每户返现金额总上限30元人民币。</p></li></ul>',
    baseInfoDetail: '<div style="margin: 0; padding: 0; font-size: 16px; line-height: 1.5;"><p>年费政策： 免首年，刷卡6次免次年</p> <p>积分规则： 按实际入账金额单笔每20元人民币/2美元积1分</p> <p>积分有效期： 积分永久有效</p> <p>取现： 取现手续费为取现金额的1%，最低境内收费10元</p> <p>最低还款比例： 10%</p> <p>免息期： 最短20天，最长50天</p> <p>短信通知： 单笔300元以下的境内POS刷卡消费（含快捷支付）不再发送提醒短信，任意金额消费将由官方微信提醒</p> <p>失卡保障： 招商银行信用卡可享受48小时挂失前失卡保障服务</p> <p>申请条件： 主卡申请人如果是本国居民年龄需在18-60周岁之间，如果是境外人士年龄需在25-60周岁之间；附属卡申请人需为主卡人的父母、配偶或子女(年龄在18周岁以上)</p> <p>申请材料： 主卡申请人身份证复印件，境内人士请提供居民身份证复印件。(接受十八岁至六十周岁的境内人士。二十五至六十周岁的外籍人士申请主卡) 境外人士的护照或港澳居民来往内地通行证、港澳同胞回乡证或台湾居民来往大陆通行证复印件及在境内的居留证或暂住证复印件 工作证明文件，如：工作证复印件、工作单位开具的工作证明原件、职称复印件、专业资格证书复印件等 为使您获得更准确的评估和额度，建议提供其他财力证明(如：银行代发工资记录、单位开具的收入证明、所得税扣缴凭证、自有房产证、银行定期存单等资料的复印件)</p></div>',
    correlationCostDetail: '<div style="margin: 0; padding: 0; font-size: 16px; line-height: 1.5;"><p>年费政策:刷卡免年费</p><p>卡年费:200元</p><p>取现额度: 50%</p><p>免息期:20天到50天</p><p>分期费率:2期、3期、6期、10期、12期、18期、24期和36期，单期手续费率为0%~1.67%。</p></div>'
  }, {
    id: 3,
    cardImg: 'https://p.51credit.com/bos/ka_img/card/2019/8/8/1565246524654.png',
    cardName: '招商银行愤怒的小鸟小小白',
    cardFeature: '三款运动的小鸟 萌萌哒',
    cardLevel: '金卡',
    currencyKind: '人民币',
    issueOrgan: '银联',
    cardAnnualFee: '200元',
    onlyPrivilege: [' 随机返现'],
    cardAnnualFeePolicy: '刷卡免年费',
    withdraw: '最高取现比例50%，取现手续费为取现金额的1%，最低境内收费10元',
    repayment: '最低还款金额为本月账单的10%，日息0.05%',
    cardEquity: '现金随时取 额度更给力,生日月双倍积分',
    cardTags: '金卡,银联,人民币',
    integralRules: '按实际入账金额单笔每20元人民币/2美元积1分',
    equityDetail: '<ul style="list-style: none; margin: 0; padding: 0; font-size: 16px; line-height: 1.5;"><li><h3>随机返现</h3><P>即日起至2019年12月31日（含），银联招商银行愤怒的小鸟联名卡持卡人（包括新、旧户）在唯品会官方PC网站、APP消费满10元，并于支付时选择“在线支付”—“愤怒的小鸟联名卡”完成支付，即可享受消费随机返现权益。每户每天返现次数上限为3次，活动期间每户返现金额总上限30元人民币。</p></li></ul>',
    baseInfoDetail: '<div style="margin: 0; padding: 0; font-size: 16px; line-height: 1.5;"><p>年费政策： 免首年，刷卡6次免次年</p> <p>积分规则： 按实际入账金额单笔每20元人民币/2美元积1分</p> <p>积分有效期： 积分永久有效</p> <p>取现： 取现手续费为取现金额的1%，最低境内收费10元</p> <p>最低还款比例： 10%</p> <p>免息期： 最短20天，最长50天</p> <p>短信通知： 单笔300元以下的境内POS刷卡消费（含快捷支付）不再发送提醒短信，任意金额消费将由官方微信提醒</p> <p>失卡保障： 招商银行信用卡可享受48小时挂失前失卡保障服务</p> <p>申请条件： 主卡申请人如果是本国居民年龄需在18-60周岁之间，如果是境外人士年龄需在25-60周岁之间；附属卡申请人需为主卡人的父母、配偶或子女(年龄在18周岁以上)</p> <p>申请材料： 主卡申请人身份证复印件，境内人士请提供居民身份证复印件。(接受十八岁至六十周岁的境内人士。二十五至六十周岁的外籍人士申请主卡) 境外人士的护照或港澳居民来往内地通行证、港澳同胞回乡证或台湾居民来往大陆通行证复印件及在境内的居留证或暂住证复印件 工作证明文件，如：工作证复印件、工作单位开具的工作证明原件、职称复印件、专业资格证书复印件等 为使您获得更准确的评估和额度，建议提供其他财力证明(如：银行代发工资记录、单位开具的收入证明、所得税扣缴凭证、自有房产证、银行定期存单等资料的复印件)</p></div>',
    correlationCostDetail: '<div style="margin: 0; padding: 0; font-size: 16px; line-height: 1.5;"><p>年费政策:刷卡免年费</p><p>卡年费:200元</p><p>取现额度: 50%</p><p>免息期:20天到50天</p><p>分期费率:2期、3期、6期、10期、12期、18期、24期和36期，单期手续费率为0%~1.67%。</p></div>'
  }, {
    id: 4,
    cardImg: 'https://p.51credit.com/bos/ka_img/card/2019/7/31/1564535957758.jpg',
    cardName: '招商银行宝可梦粉丝卡家族款',
    cardFeature: '就决定是你了',
    cardLevel: '金卡',
    currencyKind: '人民币',
    issueOrgan: '银联',
    cardAnnualFee: '200元',
    onlyPrivilege: [' 随机返现'],
    cardAnnualFeePolicy: '刷卡免年费',
    withdraw: '最高取现比例50%，取现手续费为取现金额的1%，最低境内收费10元',
    repayment: '最低还款金额为本月账单的10%，日息0.05%',
    cardEquity: '现金随时取 额度更给力,生日月双倍积分',
    cardTags: '金卡,银联,人民币',
    integralRules: '按实际入账金额单笔每20元人民币/2美元积1分',
    equityDetail: '<ul style="list-style: none; margin: 0; padding: 0; font-size: 16px; line-height: 1.5;"><li><h3>随机返现</h3><P>即日起至2019年12月31日（含），银联招商银行愤怒的小鸟联名卡持卡人（包括新、旧户）在唯品会官方PC网站、APP消费满10元，并于支付时选择“在线支付”—“愤怒的小鸟联名卡”完成支付，即可享受消费随机返现权益。每户每天返现次数上限为3次，活动期间每户返现金额总上限30元人民币。</p></li></ul>',
    baseInfoDetail: '<div style="margin: 0; padding: 0; font-size: 16px; line-height: 1.5;"><p>年费政策： 免首年，刷卡6次免次年</p> <p>积分规则： 按实际入账金额单笔每20元人民币/2美元积1分</p> <p>积分有效期： 积分永久有效</p> <p>取现： 取现手续费为取现金额的1%，最低境内收费10元</p> <p>最低还款比例： 10%</p> <p>免息期： 最短20天，最长50天</p> <p>短信通知： 单笔300元以下的境内POS刷卡消费（含快捷支付）不再发送提醒短信，任意金额消费将由官方微信提醒</p> <p>失卡保障： 招商银行信用卡可享受48小时挂失前失卡保障服务</p> <p>申请条件： 主卡申请人如果是本国居民年龄需在18-60周岁之间，如果是境外人士年龄需在25-60周岁之间；附属卡申请人需为主卡人的父母、配偶或子女(年龄在18周岁以上)</p> <p>申请材料： 主卡申请人身份证复印件，境内人士请提供居民身份证复印件。(接受十八岁至六十周岁的境内人士。二十五至六十周岁的外籍人士申请主卡) 境外人士的护照或港澳居民来往内地通行证、港澳同胞回乡证或台湾居民来往大陆通行证复印件及在境内的居留证或暂住证复印件 工作证明文件，如：工作证复印件、工作单位开具的工作证明原件、职称复印件、专业资格证书复印件等 为使您获得更准确的评估和额度，建议提供其他财力证明(如：银行代发工资记录、单位开具的收入证明、所得税扣缴凭证、自有房产证、银行定期存单等资料的复印件)</p></div>',
    correlationCostDetail: '<div style="margin: 0; padding: 0; font-size: 16px; line-height: 1.5;"><p>年费政策:刷卡免年费</p><p>卡年费:200元</p><p>取现额度: 50%</p><p>免息期:20天到50天</p><p>分期费率: 2期、3期、6期、10期、12期、18期、24期和36期，单期手续费率为0%~1.67%。</p></div>'
  }, {
    id: 5,
    cardImg: 'https://p.51credit.com/bos/ka_img/card/2019/4/30/1556613618540.gif',
    cardName: '招商银行王者荣耀联名卡',
    cardFeature: '新户首刷送精品背包',
    cardLevel: '金卡',
    currencyKind: '人民币',
    issueOrgan: '银联',
    cardAnnualFee: '300元',
    onlyPrivilege: [' 新户首刷送精品背包'],
    cardAnnualFeePolicy: '刷卡免年费',
    withdraw: '最高取现比例50%，取现手续费为取现金额的1%，最低境内收费10元',
    repayment: '最低还款金额为本月账单的10%，日息0.05%',
    cardEquity: '现金随时取 额度更给力,生日月双倍积分',
    cardTags: '金卡,银联,人民币',
    integralRules: '按实际入账金额单笔每20元人民币/2美元积1分',
    equityDetail: '<ul style="list-style: none; margin: 0; padding: 0; font-size: 16px; line-height: 1.5;"><li><h3>随机返现</h3><P>即日起至2019年12月31日（含），银联招商银行愤怒的小鸟联名卡持卡人（包括新、旧户）在唯品会官方PC网站、APP消费满10元，并于支付时选择“在线支付”—“愤怒的小鸟联名卡”完成支付，即可享受消费随机返现权益。每户每天返现次数上限为3次，活动期间每户返现金额总上限30元人民币。</p></li></ul>',
    baseInfoDetail: '<div style="margin: 0; padding: 0; font-size: 16px; line-height: 1.5;"><p>年费政策： 免首年，刷卡6次免次年</p> <p>积分规则： 按实际入账金额单笔每20元人民币/2美元积1分</p> <p>积分有效期： 积分永久有效</p> <p>取现： 取现手续费为取现金额的1%，最低境内收费10元</p> <p>最低还款比例： 10%</p> <p>免息期： 最短20天，最长50天</p> <p>短信通知： 单笔300元以下的境内POS刷卡消费（含快捷支付）不再发送提醒短信，任意金额消费将由官方微信提醒</p> <p>失卡保障： 招商银行信用卡可享受48小时挂失前失卡保障服务</p> <p>申请条件： 主卡申请人如果是本国居民年龄需在18-60周岁之间，如果是境外人士年龄需在25-60周岁之间；附属卡申请人需为主卡人的父母、配偶或子女(年龄在18周岁以上)</p> <p>申请材料： 主卡申请人身份证复印件，境内人士请提供居民身份证复印件。(接受十八岁至六十周岁的境内人士。二十五至六十周岁的外籍人士申请主卡) 境外人士的护照或港澳居民来往内地通行证、港澳同胞回乡证或台湾居民来往大陆通行证复印件及在境内的居留证或暂住证复印件 工作证明文件，如：工作证复印件、工作单位开具的工作证明原件、职称复印件、专业资格证书复印件等 为使您获得更准确的评估和额度，建议提供其他财力证明(如：银行代发工资记录、单位开具的收入证明、所得税扣缴凭证、自有房产证、银行定期存单等资料的复印件)</p></div>',
    correlationCostDetail: '<div style="margin: 0; padding: 0; font-size: 16px; line-height: 1.5;"><p>年费政策:刷卡免年费</p><p>卡年费:200元</p><p>取现额度: 50%</p><p>免息期:20天到50天</p><p>分期费率: 2期、3期、6期、10期、12期、18期、24期和36期，单期手续费率为0%~1.67%。</p></div>'
  }
]
export default cardList