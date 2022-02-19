//#region 全域變數
const Discord = require('discord.js');
const client = new Discord.Client();
const ytdl = require('ytdl-core');
const auth = require('./JSONHome/auth.json');
const prefix = require('./JSONHome/prefix.json');

//#endregion

//#region 登入
client.login(auth.key);

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

//#endregion

//#region message事件入口
client.on('message', msg => {
    //前置判斷
    try {
        if (!msg.guild || !msg.member) return; //訊息內不存在guild元素 = 非群組消息(私聊)
        if (!msg.member.user) return; //幫bot值多拉一層，判斷上層物件是否存在
        if (msg.member.user.bot) return; //訊息內bot值為正 = 此消息為bot發送
    } catch (err) {
        return;
    }

    //字串分析
    try {
        let tempPrefix = '-1';
        const prefixED = Object.keys(prefix); //前綴符號定義
        prefixED.forEach(element => {
            if (msg.content.substring(0, prefix[element].Value.length) === prefix[element].Value) {
                tempPrefix = element;
            }
        });
        //實作幹話區
        switch (tempPrefix) {
            case '0': //文字回應功能
                const cmd = msg.content.substring(prefix[tempPrefix].Value.length).split(' '); //以空白分割前綴以後的字串
                switch (cmd[0]) {
                    case '阿不魯魯拉':
                        msg.reply('阿布魯啦魯魯啦魯，布魯拉布魯啦魯');
                        break;
                    case '供三小':
                        msg.channel.send('你才在供三小?');
                        break;
                    case '三小':
                        msg.channel.send('你才三小?');
                        break;
                    case '靠北':
                        msg.reply('靠北三小?');
                        break;
                    case '39':
                        msg.channel.send('https://cdn.discordapp.com/emojis/913082857294024795.webp?size=128&quality=lossless');
                        break;
                    case '平':
                        msg.reply('(磨刀)蛤?再說一次? https://media.discordapp.net/attachments/686365104932913346/935941697249116160/IMG_2663.png?width=682&height=600');
                        break;
                    case '林娘勒':
                        msg.reply('卡好勒');
                        break;
                    case '早安':
                        var timeNow = new Date();
                        var hours = timeNow.getHours();
                        console.log(hours);
                        if (hours<12){
                        msg.channel.send('早阿綠譜都無法AP的廢物www');
                        } else if(hours>18){
                        msg.reply('阿是有多早?都他媽晚上了是在靠北?');
                        } else if(hours>12){
                        msg.reply('都下午了洗勒幹?');
                        } else if(hours=12){
                        msg.reply('因為<@686364780776259615>也喜歡說早安，我也跟你說一聲——__***早安!!!!!***__');
                        }
                        break;
                    case '軟體':
                        for(var e=0; e<5; e++){
                        msg.reply('你才軟體啦!你全家都軟體啦幹!看我刷死你他媽的')};
                        break;
                    case '低能':
                        msg.reply('你才低能啦你全家都低能OuOq!!!!');
                        break;
                    case 'pick':
                        msg.reply('你以為我會像雪ミク一樣這麼友善嗎?');
                        break;
                    case 'peko':
                        msg.reply('pe?...pe?...**你還是要說我是軟體對吧?**');
                        break;
                    case 'givemegems':
                        console.log('some one type somthing stupid lol');
                        msg.reply('去死啦幹');
                        break;
                    case '兇':
                        msg.reply('我就兇，也很胸wwww');
                        break;
                    case '媽媽':
                        msg.reply('我沒有你這種笨兒子或女兒，看你有沒有雞雞而已ww');
                        break;
                    case 'error':
                        msg.channel.send('error404, cannot find your brain');
                        break;
                    case '洗勒幹':
                        msg.channel.send('哩價勒幹勒及掰');
                        break;
                    case '管理員':
                        msg.reply('實不相瞞，其實我有管理員權限可以踢你wwwww');
                        break;
                    case '海膽':
                        msg.reply('我老大的老大ww我愛他');
                        break;
                    case 'yakimiku':
                        msg.reply('我會怕"""');
                        break;
                    case 'chi':
                        msg.reply('我老爹的爹?酷欸我也要nitro!!');
                        break;
                    case '拔拔':
                        msg.reply('My master, 撒魚||我還在想他到底有甚麼毛病www瘋鯊一隻||');
                        break;
                    case 'myAvatar':
                        const avatar = GetMyAvatar(msg);
                        if (avatar.files) msg.channel.send(`${msg.author}`, avatar).catch(err => { console.log(err) });
                        break;
                    case 'BREAK!':
                        function EmergencyExit(){process.exit(1)};
                        setTimeout(EmergencyExit, 2000);
                        msg.reply('急停按鈕啟動 <@686364780776259615>');
                }
                break;
            case '1': //水晶池抽獎指令
                DrawFunction0(msg);
                //中間放置其他case
                break;
            case '2': //常駐池抽獎指令
                DrawFunction1(msg);
                break;
            case '3': //大獎獎池抽獎指令
                DrawFunction2(msg);
                break;
            case '4': //打架
                BattleFunction(msg);
                break;
            case '5': //正常版咪哭，也就是說不會很兇?
                console.log('log5');
                NormalMiku(msg);
                break;
            case '6'://標註功能區
                console.log('log6');
                TagReply(msg);
                break;
        }   
    } catch (err) {
        console.log('OnMessageError', err);
    }
});

//#endregion

//#region 抽獎系統
    //水晶獎池抽獎系統
function DrawFunction0(msg) {
    //將訊息內的前綴字截斷，後面的字是我們要的
    const content = msg.content.substring(prefix[1].Value.length);
    //指定我們的間隔符號
    const splitText = ' ';
    //用間隔符號隔開訊息 contents[0] = 指令,contents[1] = 參數
    const contents = content.split(splitText);
    //單抽
    switch (contents[0]){
        case 'draw': //單抽
        var items=["50000水晶", "15000水晶", "8000水晶", "3500水晶", "2000水晶", "安慰獎300水晶", "水晶盤子稱號"];
        var itemsWeight=[5, 25, 35, 100, 150, 9150, 100];
        function weightedRandom(items, itemsWeight)
        {
            var totalWeight=eval(itemsWeight.join("+"));
            console.log(totalWeight);
            // 1000
            var randomArray=[];
            for(var i=0; i<items.length; i++)
            {
                for(var j=0; j<itemsWeight[i]; j++)
                {
                    randomArray.push(i);
                }
            }
            var randomNumber=Math.floor(Math.random()*totalWeight);
            return items[randomArray[randomNumber]];
        }
        msg.reply("恭喜你抽中...");
        function sendmessage1draw(){msg.reply(weightedRandom(items, itemsWeight))};
        setTimeout(sendmessage1draw, 3000);
        break;


//region 十抽
        case '10draw': //十抽
    msg.channel.send("恭喜你抽中...");
        var items=["50000水晶", "15000水晶", "8000水晶", "3500水晶", "2000水晶", "安慰獎300水晶", "水晶盤子稱號"];
        var itemsWeight=[5, 25, 35, 100, 150, 9200, 100];
        function weightedRandom(items, itemsWeight)
        {
            var totalWeight=eval(itemsWeight.join("+"));
            console.log(totalWeight);
            // 1000
            var randomArray=[];
            for(var i=0; i<items.length; i++)
            {
                for(var j=0; j<itemsWeight[i]; j++)
                {
                    randomArray.push(i);
                }
            }
            var randomNumber=Math.floor(Math.random()*totalWeight);
            return items[randomArray[randomNumber]];
        }
        msg.channel.send(weightedRandom(items, itemsWeight));
        for (var l=0; l<9; l++){
        msg.channel.send(weightedRandom(items, itemsWeight))
        };
        break; 
        case '100draw': //百抽
        msg.channel.send("恭喜你抽中...");
            var items=["50000水晶", "15000水晶", "8000水晶", "3500水晶", "2000水晶", "安慰獎300水晶", "水晶盤子稱號"];
            var itemsWeight=[5, 25, 35, 100, 150, 9200, 100];
            function weightedRandom(items, itemsWeight)
            {
                var totalWeight=eval(itemsWeight.join("+"));
                console.log(totalWeight);
                // 1000
                var randomArray=[];
                for(var i=0; i<items.length; i++)
                {
                    for(var j=0; j<itemsWeight[i]; j++)
                    {
                        randomArray.push(i);
                    }
                }
                var randomNumber=Math.floor(Math.random()*totalWeight);
                return items[randomArray[randomNumber]];
            }
            msg.channel.send(weightedRandom(items, itemsWeight));
            for (var l=0; l<99; l++){
            msg.channel.send(weightedRandom(items, itemsWeight))
            };
            break; 
        case 'tendraw': //十抽
        msg.reply("恭喜你抽中...");
            var items=["50000水晶", "15000水晶", "8000水晶", "3500水晶", "2000水晶", "安慰獎300水晶", "水晶盤子稱號"];
            var itemsWeight=[5, 25, 35, 100, 150, 9200, 100];
         function weightedRandom(items, itemsWeight)
            {
                var totalWeight=eval(itemsWeight.join("+"));
                console.log(totalWeight);
                // 1000
                var randomArray=[];
                for(var i=0; i<items.length; i++)
                {
                    for(var j=0; j<itemsWeight[i]; j++)
                    {
                        randomArray.push(i);
                    }
                }
                var randomNumber=Math.floor(Math.random()*totalWeight);
                return items[randomArray[randomNumber]];
            }
            msg.channel.send(weightedRandom(items, itemsWeight));
            for (var l=0; l<9; l++){
            msg.channel.send(weightedRandom(items, itemsWeight))};
            };
        };
//endregion

//region 常駐獎池抽獎系統
    function DrawFunction1(msg) {
        //將訊息內的前綴字截斷，後面的字是我們要的
        const content = msg.content.substring(prefix[1].Value.length);
        //指定我們的間隔符號
        const splitText = ' ';
        //用間隔符號隔開訊息 contents[0] = 指令,contents[1] = 參數
        const contents = content.split(splitText);
    //單抽
        switch (contents[0]){
            case 'draw': //單抽
            var items=["石帳3萬", "大獎獎池抽獎券", "水晶獎池獎券3張", "10500水晶", "3060水晶", "安慰獎200水晶"];
            var itemsWeight=[1, 10, 10, 5, 10, 964];
            function weightedRandom(items, itemsWeight)
            {
                var totalWeight=eval(itemsWeight.join("+"));
                console.log(totalWeight);
                // 1000
                var randomArray=[];
                for(var i=0; i<items.length; i++)
                {
                    for(var j=0; j<itemsWeight[i]; j++)
                    {
                        randomArray.push(i);
                    }
                }
                var randomNumber=Math.floor(Math.random()*totalWeight);
                return items[randomArray[randomNumber]];
            }
            msg.reply("恭喜你抽中...");
            function sendmessage1draw(){msg.reply(weightedRandom(items, itemsWeight))};
            setTimeout(sendmessage1draw, 3000);
            if (sendmessage1draw = '安慰獎200水晶');
            msg.reply('你真的是非洲酋長欸，我就還你一半好了wwww');
            break;
    //十抽
        case '10draw': //十抽
        msg.reply("恭喜你抽中...");
            var items=["石帳3萬", "大獎獎池抽獎券", "水晶獎池獎券3張", "10500水晶", "3060水晶", "安慰獎200水晶"];
            var itemsWeight=[1, 10, 10, 5, 10, 964];
            function weightedRandom(items, itemsWeight)
            {
                var totalWeight=eval(itemsWeight.join("+"));
                console.log(totalWeight);
                // 1000
                var randomArray=[];
                for(var i=0; i<items.length; i++)
                {
                    for(var j=0; j<itemsWeight[i]; j++)
                    {
                        randomArray.push(i);
                    }
                }
                var randomNumber=Math.floor(Math.random()*totalWeight);
                return items[randomArray[randomNumber]];
            }
            msg.channel.send(weightedRandom(items, itemsWeight));
            for (var l=0; l<9; l++){
            msg.channel.send(weightedRandom(items, itemsWeight))
            };
            break; 
        case 'tendraw': //十抽
        msg.reply("恭喜你抽中...");
        var items=["石帳3萬", "大獎獎池抽獎券", "水晶獎池獎券3張", "10500水晶", "3060水晶", "安慰獎200水晶"];
        var itemsWeight=[1, 10, 10, 5, 10, 964];
            function weightedRandom(items, itemsWeight)
            {
                var totalWeight=eval(itemsWeight.join("+"));
                console.log(totalWeight);
                // 1000
                var randomArray=[];
                for(var i=0; i<items.length; i++)
                {
                    for(var j=0; j<itemsWeight[i]; j++)
                    {
                        randomArray.push(i);
                    }
                }
                var randomNumber=Math.floor(Math.random()*totalWeight);
                return items[randomArray[randomNumber]];
            }
            msg.channel.send(weightedRandom(items, itemsWeight));
            for (var l=0; l<9; l++){
            msg.channel.send(weightedRandom(items, itemsWeight));
                };
                case '100draw': //百抽
                msg.reply("恭喜你抽中...");
                    var items=["石帳3萬", "大獎獎池抽獎券", "水晶獎池獎券3張", "10500水晶", "3060水晶", "安慰獎200水晶"];
                    var itemsWeight=[1, 10, 10, 5, 10, 964];
                    function weightedRandom(items, itemsWeight)
                    {
                        var totalWeight=eval(itemsWeight.join("+"));
                        console.log(totalWeight);
                        // 1000
                        var randomArray=[];
                        for(var i=0; i<items.length; i++)
                        {
                            for(var j=0; j<itemsWeight[i]; j++)
                            {
                                randomArray.push(i);
                            }
                        }
                        var randomNumber=Math.floor(Math.random()*totalWeight);
                        return items[randomArray[randomNumber]];
                    }
                    msg.channel.send(weightedRandom(items, itemsWeight));
                    for (var l=0; l<99; l++){
                    msg.channel.send(weightedRandom(items, itemsWeight))
                    };
                    break; 
            };
    
        };

    //大獎獎池抽獎系統
    function DrawFunction2(msg) {
        //將訊息內的前綴字截斷，後面的字是我們要的
        const content = msg.content.substring(prefix[1].Value.length);
        //指定我們的間隔符號
        const splitText = ' ';
        //用間隔符號隔開訊息 contents[0] = 指令,contents[1] = 參數
        const contents = content.split(splitText);
    //單抽    
        switch (contents[0]){
            case 'draw': //單抽
            var items=["石帳9萬", "石帳5萬", "石帳3萬", "小周邊", "50000水晶", "自定義個人稱號一個月", "自定義頻道一個月", "20000水晶", "水晶獎池獎券10張", "常駐獎池獎券15張", "3000水晶"];
            var itemsWeight=[0, 5, 5, 5, 5, 5, 5, 15, 25, 25, 900];
            function weightedRandom(items, itemsWeight)
            {
                var totalWeight=eval(itemsWeight.join("+"));
                console.log(totalWeight);
                // 1000
                var randomArray=[];
                for(var i=0; i<items.length; i++)
                {
                    for(var j=0; j<itemsWeight[i]; j++)
                    {
                        randomArray.push(i);
                    }
                }
                var randomNumber=Math.floor(Math.random()*totalWeight);
                return items[randomArray[randomNumber]];
            }
            msg.reply("恭喜你抽中...");
            function sendmessage1draw(){msg.reply(weightedRandom(items, itemsWeight))};
            setTimeout(sendmessage1draw, 3000);
            break;
    //十抽
        case '10draw': //十抽
        msg.reply("恭喜你抽中...");
        var items=["石帳9萬", "石帳5萬", "石帳3萬", "小周邊", "50000水晶", "自定義個人稱號一個月", "自定義頻道一個月", "20000水晶", "水晶獎池獎券10張", "常駐獎池獎券15張", "3000水晶"];
        var itemsWeight=[0, 5, 5, 5, 5, 5, 5, 15, 25, 25, 900];
            function weightedRandom(items, itemsWeight)
            {
                var totalWeight=eval(itemsWeight.join("+"));
                console.log(totalWeight);
                // 1000
                var randomArray=[];
                for(var i=0; i<items.length; i++)
                {
                    for(var j=0; j<itemsWeight[i]; j++)
                    {
                        randomArray.push(i);
                    }
                }
                var randomNumber=Math.floor(Math.random()*totalWeight);
                return items[randomArray[randomNumber]];
            }
            msg.channel.send(weightedRandom(items, itemsWeight));
            for (var l=0; l<9; l++){
            msg.channel.send(weightedRandom(items, itemsWeight))
            };
            break; 
            case '100draw': //百抽
        msg.reply("恭喜你抽中...");
        var items=["石帳9萬", "石帳5萬", "石帳3萬", "小周邊", "50000水晶", "自定義個人稱號一個月", "自定義頻道一個月", "20000水晶", "水晶獎池獎券10張", "常駐獎池獎券15張", "3000水晶"];
        var itemsWeight=[0, 5, 5, 5, 5, 5, 5, 15, 25, 25, 900];
            function weightedRandom(items, itemsWeight)
            {
                var totalWeight=eval(itemsWeight.join("+"));
                console.log(totalWeight);
                // 1000
                var randomArray=[];
                for(var i=0; i<items.length; i++)
                {
                    for(var j=0; j<itemsWeight[i]; j++)
                    {
                        randomArray.push(i);
                    }
                }
                var randomNumber=Math.floor(Math.random()*totalWeight);
                return items[randomArray[randomNumber]];
            }
            msg.channel.send(weightedRandom(items, itemsWeight));
            for (var l=0; l<99; l++){
            msg.channel.send(weightedRandom(items, itemsWeight))
            };
            break; 
        case 'tendraw': //十抽
        msg.reply("恭喜你抽中...");
        var items=["石帳9萬", "石帳5萬", "石帳3萬", "小周邊", "50000水晶", "自定義個人稱號一個月", "自定義頻道一個月", "20000水晶", "水晶獎池獎券10張", "常駐獎池獎券15張", "3000水晶"];
        var itemsWeight=[0, 5, 5, 5, 5, 5, 5, 15, 25, 25, 900];
            function weightedRandom(items, itemsWeight)
            {
                var totalWeight=eval(itemsWeight.join("+"));
                console.log(totalWeight);
                // 1000
                var randomArray=[];
                for(var i=0; i<items.length; i++)
                {
                    for(var j=0; j<itemsWeight[i]; j++)
                    {
                        randomArray.push(i);
                    }
                }
                var randomNumber=Math.floor(Math.random()*totalWeight);
                return items[randomArray[randomNumber]];
            }
            msg.channel.send(weightedRandom(items, itemsWeight));
            for (var l=0; l<9; l++){
            msg.channel.send(weightedRandom(items, itemsWeight))};
            };
        };
//#endregion

//#region BattleFunction
function BattleFunction(msg) {
    //將訊息內的前綴字截斷，後面的字是我們要的
    const content = msg.content.substring(prefix[1].Value.length);
    //指定我們的間隔符號
    const splitText = ' ';
    //用間隔符號隔開訊息 contents[0] = 指令,contents[1] = 參數
    const contents = content.split(splitText);

    switch (contents[0]){
        case 'fight':
            const user1atk = atk1
            const user2atk = atk2
            const user1hp = hp1
            const user2hp = hp2
            client.on('message', msg => {
            });
        };
    };
//#endregion


//#region 正常版咪哭
function NormalMiku(msg) {
    console.log('Im in NormalMiku function lol');
    //將訊息內的前綴字截斷，後面的字是我們要的
    const content = msg.content.substring(prefix[1].Value.length);
    //指定我們的間隔符號
    const splitText = ' ';
    //用間隔符號隔開訊息 contents[0] = 指令,contents[1] = 參數
    const contents = content.split(splitText);

        switch (contents[0]){
        case '1':
            console.log('look at this dude wwww')
            break;
    }
}
//#endregion

//#region 標註功能區
function TagReply(msg) {
    //將訊息內的前綴字截斷，後面的字是我們要的
    const content = msg.content.substring(prefix[1].Value.length);
    //指定我們的間隔符號
    const splitText = ' ';
    //用間隔符號隔開訊息 contents[0] = 指令,contents[1] = 參數
    const contents = content.split(splitText);
   console.log('Im in tagreply lol')//到這裡之後就往生w

   switch (contents[0]){
    case 'draw': //單抽
    var items=["50000水晶", "15000水晶", "8000水晶", "3500水晶", "2000水晶", "安慰獎300水晶", "水晶盤子稱號"];
    var itemsWeight=[5, 25, 35, 100, 150, 9150, 100];
    function weightedRandom(items, itemsWeight)
    {
        var totalWeight=eval(itemsWeight.join("+"));
        console.log(totalWeight);
        // 1000
        var randomArray=[];
        for(var i=0; i<items.length; i++)
        {
            for(var j=0; j<itemsWeight[i]; j++)
            {
                randomArray.push(i);
            }
        }
        var randomNumber=Math.floor(Math.random()*totalWeight);
        return items[randomArray[randomNumber]];
    }
    msg.reply("恭喜你抽中...");
    function sendmessage1draw(){msg.reply(weightedRandom(items, itemsWeight))};
    setTimeout(sendmessage1draw, 3000);
    break;
    }
}
//#endregion

//#region 子類方法
//獲取頭像
function GetMyAvatar(msg) {
    try {
        return {
            files: [{
                attachment: msg.author.displayAvatarURL('png', true),
                name: 'avatar.jpg'
            }]
        };
    } catch (err) {
        console.log('GetMyAvatar,Error');
    }
}

//#endregion