const express = require("express");
const path = require("path");
const port = 8000;

const db = require('./config/mongoose');
const Contact = require('./models/contact');

const app = express();

app.set('view engine','ejs');
app.set('views',path.join(__dirname, 'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));

var contactList = [
    {
        name: "anugcdhf",
        phone: "1234567890"
    },
    {
        name: "bkcbcowbc",
        phone: "7019734920"
    },
    {
        name: "coechiwdhc",
        phone: "1820727421"
    }
]

app.get('/',function(req,res){
    Contact.find({}, function(error,contacts){
        if(error){
            console.log("Error in fetching contacts from db");
            return;
        }
        return res.render('home', {
            title:'My Contacts',
            contact_list: contacts
        });
    })
});

app.get('/practice',function(req,res){
    return res.render('practice',{
        title:'practice file'
    });
});

app.post('/create_contact',function(req,res){
    // contactList.push(req.body);
    Contact.create({
        name:req.body.name,
        phone:req.body.phone
    },function(error,newContact){
        if(error){
            console.log("error in creating a contact");
            return;
        }
        console.log("**************",newContact)
        return res.redirect('back');
    })
});

app.get('/delete-contact/',function(req,res){
    // console.log(req.query);
    let id = req.query.id;
    // let contactindex = contactList.findIndex(contact => contact.phone == phone);
    // contactList.splice(contactindex,1);
    Contact.findByIdAndDelete(id,function(error){
        if(error){
            console.log("error in deleting the contact");
            return;
        }
        return res.redirect('back');
    });
})

app.listen(port,function(error){
    if(error){
        console.log("error in running the server",error);
        return;
    }
    console.log("My express server is running on port" , port);
})