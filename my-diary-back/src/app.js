const express = require('express');
const bodyParser = require('body-parser');
const models = require('../db/models');

const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(bodyParser.urlencoded({extended:true}));

app.all('*',function(req,res,next){
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers','X-Requested-With');
    res.header('Access-Control-Allow-Methods','PUT,POST,GET,DELETE,OPTIONS');
    res.header('X-Powered-By','3.2.1');
    res.header('Content-Type','application/json;charset=utf-8');
    next();
})

//1.1 展示日记列表（游客）
app.get('/diaryList/visitor',async(req,res,next)=>{
    try{
        let Diary = await models.Diary.findAll({
            where:{
                privacy:0
            }
        })
        if(Diary){
            res.json({
                Diary,
                message:"游客查询所有日记成功"
            })
        }
    } catch(error){
        next(error)
    }
})

//1.2 查询所有日记列表（主人）
app.get('/diaryList/master',async(req,res,next)=>{
    try{
        let Diary = await models.Diary.findAll({})
        if(Diary){
            res.json({
                Diary,
                message:"主人查询所有日记成功"
            })
        }
    } catch(error){
        next(error)
    }
})

//2 查询所有日记类别
app.get('/diaryClass',async(req,res,next)=>{
    try{
        let diaryClass = await models.diaryClass.findAll({})
        if(diaryClass){
            res.json({
                diaryClass,
                message:"查询所有日记类别成功"
            })
        }
    } catch(error){
        next(error)
    }
})

//3.1 查询某类中的所有日记（游客）
app.get('/diaryListInClass/visitor',async(req,res,next)=>{
    try{
        let classId = req.query.id;
        let Diary = await models.Diary.findAll({
            where:{
                classId,
                privacy:0
            }
        })
        if(Diary){
            res.json({
                Diary,
                message:"游客查询此类日记成功"
            })
        }
    } catch(error){
        next(error)
    }
})

//3.2 查询某类中的所有日记（主人）
app.get('/diaryListInClass/master',async(req,res,next)=>{
    try{
        let classId = req.query.id;
        let Diary = await models.Diary.findAll({
            where:{
                classId
            }
        })
        if(Diary){
            res.json({
                Diary,
                message:"主人查询此类日记成功"
            })
        }
    } catch(error){
        next(error)
    }
})

//4 查询某个类别日记的类别名称
app.get('/diaryClassName',async(req,res,next)=>{
    try{
        let id = req.query.id;
        let diaryClass = await models.diaryClass.findOne({
            where:{
                id
            }
        })
        if(diaryClass){
            res.json({
                diaryClass,
                message:"查询此类日记名称成功"
            })
        }
    } catch(error){
        next(error)
    }
})

//5 登录
app.get('/logIn',async(req,res,next)=>{
    try{
        let userName = req.query.userName
        let password = req.query.password
        let Information = await models.Information.findOne({
            where:{
                id:1
            }
        })
        if(Information){
            if(userName==Information.userName && password==Information.password){
                res.json({
                    success:1,
                    message:"登录成功"
                })
            }
            else{
                res.json({
                    success:0,
                    message:"登录失败"
                })
            }
        }
    } catch(error){
        next(error)
    }
})

//6 获取个人信息
app.get('/getInformation',async(req,res,next)=>{
    try{
        let Information = await models.Information.findOne({
            where:{
                id:1
            }
        })
        res.json({
            Information,
            message:"获取个人资料成功"
        })
    } catch(error){
        next(error)
    }
})

//7 修改签名
app.put('/modifySign',async(req,res,next)=>{
    try{
        let {sign} = req.body;
        let Information = await models.Information.findOne({
            where:{
                id:1
            }
        })
        if(Information){
            Information = await Information.update({
                sign
            })
            res.json({
                Information,
                message:"修改个人资料成功"
            })
        }
    } catch(error){
        next(error)
    }
})

//8 修改某个日记
app.put('/modifyDiary',async(req,res,next)=>{
    try{
        let {id,time,context,classId,privacy} = req.body;
        let diary = await models.Diary.findOne({
            where:{
                id
            }
        })
        if(diary){
            diary = await diary.update({
                time,
                context,
                classId,
                privacy
            })
            res.json({
                diary,
                message:"修改日记成功"
            })
        }
    } catch(error){
        next(error)
    }
})

//9 删除某个日记
app.delete('/deleteDiary',async(req,res,next)=>{
    try{
        let id = req.query.id
        models.Diary.destroy({
            where:{
                id
            }
        })
        res.json({
            message:"删除日记成功"
        })
    } catch(error){
        next(error)
    }
})

//10 编辑日记分类名
app.put('/modifyDiaryClassName',async(req,res,next)=>{
    try{
        let {id,name} = req.body
        let diaryClass = await models.diaryClass.findOne({
            where:{
                id
            }
        })
        if(diaryClass){
            diaryClass = await diaryClass.update({
                name
            })
            res.json({
                diaryClass,
                message:"修改日记类别名成功"
            })
        }
    } catch(error){
        next(error)
    }
})

//11 增加日记分类
app.post('/addDiaryClass',async(req,res,next)=>{
    try{
        let {name} = req.body
        let diaryClass = await models.diaryClass.create({
            name
        })
        res.json({
            diaryClass,
            message:"新分类添加成功"
        })
    } catch(error){
        next(error)
    }
    
})

//12 增加新日记
app.post('/addDiary',async(req,res,next)=>{
    try{
        let {time,context,classId,privacy} = req.body;
        let diary = await models.Diary.create({
            time,
            context,
            classId,
            privacy
        })
        res.json({
            message:"新日记添加成功",
            diary
        })
    } catch(error){
        next(error)
    }
})

//13 删除某个日记分类及其中所有日记
app.delete('/deleteDiaryClassAndItsDiaries',async(req,res,next)=>{
    try{
        let id = req.query.id
        models.diaryClass.destroy({
            where:{
                id
            }
        })
        models.Diary.destroy({
            where:{
                classId:id
            }
        })
        res.json({
            message:"删除日记分类成功"
        })
    } catch(error){
        next(error)
    }
    
})

app.use((err,req,res,next)=>{
    if(err){
        res.status(500).json({
            message:err.message
        })
    }
})

app.listen(3000,()=>{
    console.log('服务启动成功')
})