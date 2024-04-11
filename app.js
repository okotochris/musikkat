const express= require("express");
const multer = require('multer');
const mongoose= require('mongoose');
const Blog= require('./blog');
const Blogv= require('./blogv');
const Blogn= require('./blogn');
const Blogd= require('./blogd');
const Blogg= require('./blogg');


const dbUI= "mongodb+srv://bigdreamtech:hEB2eCSrJbA32irw@form.ilrxl.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(dbUI)
.then(result=>{
	console.log("connected");
})
.catch(err=>{
	console.log(err);
})
mongoose.set('strictQuery', true)
const app= express();
// PORT CONNECTION

const PORT = process.env.PORT || 3000
app.listen(PORT, (err)=>{
	if(err){
		console.log(err);
	}
	else{
		console.log(`Port running in ${PORT}`);
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

//HOME PAGE FOR UPCOMING ARTIST
app.get('/', async (req, res)=>{
	try{
		const result = await Blog.find().sort({createdAt:-1})
		const music = await Blogd.find().sort({createdAt:-1})
		const news = await Blogn.find().sort({ createdAt: -1 });
		const video = await Blogv.find().sort({ createdAt: -1 });
		res.render('index', {title:'Home', blogs: result, news, music, video})
	}
	catch(err){
		console.log(err)
	}
})

// TOP NIGERIA AND FOREING MUSICIAN 
app.get('/top_song', async (req, res)=>{
	try{
		const result = await Blogd.find().sort({createdAt:-1})
		
		res.render('top_song', {title:"Music", blogs:result});
	}
	catch(err){
		console.log(err)
	}
})
app.get('/top_song/:id', async (req, res)=>{
	const id = req.params.id;
	try{
		const result = await Blogd.findById(id)
		const top_songs = await Blog.find().sort({createdAt:-1})
		res.render('detailsd', {blogd:result, blogs: top_songs, title:result.artist_name})
	}
	catch(err){
		console.log(err)
	}
  }) 
//godspel songs API
app.get('/godspel', (req, res)=>{
	Blogg.find().sort({createdArt:-1})
.then(result=>{
	res.render('godspel',{title: "Godspel", bloggs: result })
})
})

app.get('/godspel/:id', async (req, res)=>{
	const id = req.params.id;
	try{
		const godspelsong = await Blogg.findById(id)
		const top_song = await Blogd.find()
		console.log(top_song.image)
		//const godspelsong = promise.json()
		res.render('detailsg', {blogg: godspelsong, blogs:top_song, title: 'godspelsong.artist_name'})
	}
	catch(err){
		console.log(err)
	}
	
  }) 
// NEWS FIELD
app.get('/news_field', async (req, res) => {
	try {
	  const result = await Blogn.find().sort({ createdAt: -1 });
	  res.render('news_field', { title: "News_field", blogns: result });
	} catch (err) {
	  console.log(err);
	  res.status(500).send('Internal Server Error');
	}
  });
  
  
app.get('/news_field/:id', async (req, res)=>{
	const id = req.params.id;
	try{
		const result = await Blogn.findById(id)
		
	// get top song from database
		const top_song = await Blogd.find()
		res.render('detailsn', {blogn:result, blogs:top_song, title:result.helder})
	}
	catch(err){
		console.log(err)
	}
  }) 

//ABOUT THE AUTHOR OF THE SITE 
app.get('/about', (req, res,)=>{
	res.render('about', {title:"About"});
})
//SHORT VIDEOS FROM YOUTUBE
app.get('/short_video', async (req, res) => {
	try {
	  const result = await Blogv.find().sort({ createdAt: -1 });
	  res.render('short_video', { title: "Short_Video", blogvs: result });
	} catch (err) {
	  console.error(err);
	}
  });  
  
// ADMIN PAGE TO UPLOAD SONGS 
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
		 })
		.catch(err => {
		  console.log(err)
		})
	} else if (req.body.formType == 'Blogd') {
	  const blogd = new Blogd({
		artist_name: req.body.artist_name,
		comment: req.body.comment,
		lyrics: req.body.lyrics,
		dlink: req.body.dlink,
		plink: req.body.plink,
		image: req.files["image"][0].filename
	  });
	  blogd.save()
		.then(result => {
		  res.redirect('admin');
		 
		})
		.catch(err => {
		  console.log(err)
		})
	} else if (req.body.formType == "Blogv") {
	  const blogv = new Blogv(req.body)
	  blogv.save()
		.then(result => {
		  res.redirect('admin')
		  })
		.catch(err => {
		  console.log(err)
		})
	  console.log('if statement is working')
	} else if (req.body.formType == 'Blogn') {
	  const blogn = new Blogn({
		helder: req.body.helder,
		news: req.body.news,
		news1: req.body.news1,
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
		console.log('Gospel blog visited')
		const blogg = new Blogg({
			artist_name: req.body.artist_name,
			comment: req.body.comment,
			lyrics: req.body.lyrics,
			dlink: req.body.dlink,
			plink: req.body.plink,
			image: req.files["image"][0].filename
		})
		blogg.save()
		.then(result => {
			
		  res.redirect('admin');
		})
		.catch(err => {
		  console.log(err)
		})
	}
  })
 
  
 
  
  app.get('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        let top_songs = await Blogd.find().sort({ createdAt: -1 });
        let result = await Blogd.findById(id);
        
        if (result !== null && result !== undefined) {
            // If the document exists in Blogd
            res.render('detailsd', { blogd: result, blogs: top_songs, title: 'More' });
        } else {
            // If the document doesn't exist in Blogd, check Blog
            result = await Blog.findById(id);
            if (result !== null && result !== undefined) {
                // If the document exists in Blog
                res.render('details', { blog: result, music:top_songs, title: 'More' });
            } else {
                // If the document doesn't exist in Blog as well, render with null blog
                res.render('details', { blog: null, blogs: top_songs, title: 'More' });
            }
        }
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
});

  
//ALL SEARCH API
//HOME PAGE SEARCH
app.post('/homepage-search', async (req, res) => {
    const searchTerm = req.body.items;
    try {
        const result = await Blog.find({ artist_name: { $regex: new RegExp(searchTerm, 'i') } });
        res.json(result);
    } catch (err) {
        res.status(500).json({ message: `No items found for '${searchTerm}'`, error: err.message });
    }
});


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