const express= require("express");
const multer = require('multer');
const mongoose= require('mongoose');
const Blog= require('./blog');
const Blogv= require('./blogv');
const Blogn= require('./blogn');
const Blogd= require('./blogd');


const dbUI= "mongodb+srv://bigdreamtech:hEB2eCSrJbA32irw@form.ilrxl.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(dbUI)
.then(result=>{
	console.log("connected");
})
.catch(err=>{
	console.log(err);
})
const app= express();

app.listen(3001, (err)=>{
	if(err){
		console.log(err);
	}
	else{
		console.log("port running at 3001");
		}
})
	app.set('view engine', 'ejs');
	app.use(express.static('public')); 
	app.use(express.static('upload'));
	app.use(express.urlencoded({extended:false}))
	app.use(express.json());
	//app.use(morgan("div"));53

	
	const filestorage = multer.diskStorage({
		destination: (req, file, cb) => {
		  cb(null, './upload')
		},
		filename: (req, file, cb) => {
		  cb(null, Date.now() + '-' + file.originalname)
		}
	  })
	  
	  const upload = multer({ storage: filestorage })
	
app.get('/', (req, res)=>{
	Blog.find().sort({createdAt:-1})
	.then((result)=>{
		res.render('index', {title:"Home", blogs:result});
	})
	.catch((err)=>{
		console.log(err) 
	})
})
app.get('/download', (req, res)=>{
	Blogd.find().sort({createdAt:-1})
	.then(result=>{
		res.render('download', {title:'Top_Song', blogds: result})
	})
	.catch(err=>{
		console.log(err)
	})
})
app.get('/news_field', (req, res)=>{
	Blogn.find().sort({createdAt:-1})
	.then(result=>{
		res.render('news_field', {title: "News_field", blogns: result})
	})
	.catch(err=>{
		console.log(err);
	})
})

app.get('/about', (req, res,)=>{
	res.render('about', {title:"About"});
})
app.get('/short_video', (req, res)=>{
	Blogv.find().sort({createdAt: -1})
	.then(result=>{
		res.render('short_video', {title: "Short_Video",  blogvs:result})
	})
	.catch(err=>{
		console.log(err)
	})
})
app.get('/admin', (req, res)=>{
	res.render('admin', {title:"Admin"});
	
})
app.post('/admin', upload.fields([{ name: "image" }, { name: "audio" }]), (req, res) => {
	console.log(req.body.formType)
	if (req.body.formType == "Blog") {
	  const blog = new Blog({
		artist_name: req.body.artist_name,
		header: req.body.header,
		content: req.body.content,
		image: req.files["image"][0].filename,
		audio: req.files["audio"][0].filename
	  });
	  blog.save(req.body)
		.then(result => {
		  res.redirect('admin')
		  console.log(req.body)
		})
		.catch(err => {
		  console.log(err)
		})
	} else if (req.body.formType == 'Blogd') {
	  const blogd = new Blogd({
		artist_name: req.body.artist_name,
		comment: req.body.comment,
		dlink: req.body.dlink,
		plink: req.body.plink,
		image: req.files["image"][0].filename
	  });
	  blogd.save()
		.then(result => {
		  res.redirect('admin');
		  console.log(req.files["image"][0].filename)
		})
		.catch(err => {
		  console.log(err)
		})
	} else if (req.body.formType == "Blogv") {
	  const blogv = new Blogv(req.body)
	  blogv.save()
		.then(result => {
		  res.redirect('admin')
		  console.log(req.body)
		})
		.catch(err => {
		  console.log(err)
		})
	  console.log('if statement is working')
	} else if (req.body.formType == 'Blogn') {
	  const blogn = new Blogn({
		helder: req.body.helder,
		news: req.body.news,
		image: req.files["image"][0].filename
	  })
	  blogn.save()
		.then(result => {
			
		  res.redirect('admin');
		})
		.catch(err => {
		  console.log(err)
		})
	} else {
	  console.log('you haven\'t treated this form yet')
	  res.redirect('admin')
	}
  })
  
  
app.get('/form', (req, res)=>{
	res.render('form');
})

app.post('/form', (req, res)=>{
	console.log(req.body);
	res.render('form');
	
})
app.use((req , res)=>{
	res.status(404).render('404', {title:'404'})
})