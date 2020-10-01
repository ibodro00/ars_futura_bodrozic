// newlist_get, newlist_post, list_new
const new_list = require('../models/url');
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');


const newlist_get = (req, res) => {
    const token = req.cookies.jwt;
    
    if(token)
    {
        jwt.verify(token, 'toodoo auth', async(err, decryptedtoken) => {
            if(err){
                console.log(err);
            }
            else{
                let auth_list = await new_list.find({uuid:decryptedtoken.uuid});
                if(auth_list)
                {
                    res.redirect('/' + decryptedtoken.n);
                }
                else
                {
                    res.render('index', {title:"Homepage"});
                }
            }
        })
    }
    else
    {
    res.render('index', {title:"Homepage"});
    }
}

const newlist_post = async(req, res) => {
    const data_url={
        data:req.body.new_list,
        uuid: uuidv4()
    }
    try{
    await new_list.create(data_url, (err, item) => {
        if(err)
        {
            console.log(err);
        }
        else
        {
            item.save();
            res.redirect('/' + data_url.uuid);
        }
    })  
    
    }
    catch(err){
    }
}

const list_new = (req, res) => {
    res.cookie('jwt', '', {maxAge: 1});
    res.json({redirect:'/'})
}
module.exports = {
    newlist_get,
    newlist_post,
    list_new
}