// Serverı kurma
const express = require('express');
const app = express();
app.use(express.static('public'));
app.use(express.urlencoded({extended : true}));
app.listen(3000); // 3000 numaralı port'u dinliyor.

//View engine'i kurma ve EJS olarak ayarlama
app.set('view engine', 'ejs');
app.set('views', 'myviews');

// MongoDB ve Mongoose kullanarak veri tabanının ayarlanması
const mongodb= 'mongodb+srv://mertcan:UOwcgRNq5jlT0ZzC@cluster.oqera.mongodb.net/WebProjectGitHubDatabase?retryWrites=true&w=majority'
const mongoose= require('mongoose');
mongoose.connect(mongodb, {useNewUrlParser: true, useUnifiedTopology: true})
    .then((result)=> console.log('Veri tabanına bağlanıldı.'))
    .catch((err)=> console.log(err));
const User = require('./models/kullanici')

// Kullanıcı kaydı
app.post('/create',(req,res)=>{
    let reg = true;
    let createYon = false;
    let createCalis=false;
    let createMus=false;
    
    // Kayıtlı kullanıcıları kayıt olma zamanına göre ilk kayıt olandan son kayıt olana kadar sıralayıp tarama yapıyor
    User.find().sort({createdAt: -1})
    .then((result)=>{
        console.log("Kayıt Sonucu: ");

        // Kayıt edilmek istenen kullanıcının sistemde bulunup bulunmadığının kontrolü
        for(let i=0; i<result.length;i++){
            if(result[i].kullanici_adi == req.body.kullanici_adi && result[i].sifre == req.body.sifre && result[i].kullanici_tipi == req.body.kullanici_tipi ){
                reg = false;
            } 
        }
        // Sistemde kullanıcının bulunması durumunda uyarı mesajının konsola bastırılması
        if(reg==false){
            console.log("Sistemde böyle bir kullanıcı bulunuyor. Lütfen girdilerinizi değiştiriniz.");
        }

        // Kullanıcı tipinin doğru girilip girilmediğinin kontrolü
        if(req.body.kullanici_tipi == "yonetici"){
            createYon=true;
        }
        if(req.body.kullanici_tipi == "calisan"){
            createCalis=true;
        }
        if(req.body.kullanici_tipi == "musteri"){
            createMus=true;
        }  

        //Girilmediği takdirde uyarının konsola bastırılması
        if(!(createYon == true || createCalis== true || createMus== true)){
            console.log("Lütfen geçerli bir kullanıcı tipi giriniz. ");
        }

        // Kullanıcı kaydının gerçekleştirilmesi
        if(reg == true && (createYon == true || createCalis== true || createMus== true)){
            const user = new User(req.body);
            user.save();
            console.log("Başarılı bir şekilde kayıt oldunuz. ");
            res.redirect('/')
        }
    })
    // Hata oluşması durumunda hatanın konsola bastırılması
    .catch((err)=>{
        console.log(err)
    })
})

// Giriş kontrolü ve kullanıcı tipine göre yönlendirme 
app.post('/', (req,res)=>{
    let login = false;
    let loginYon = false;
    let loginCalis=false;
    let loginMus=false;

    User.find().sort({createdAt: -1})
        .then((result)=>{

            // Kullanıcının sistemde bulunup bulunmadığının kontrolü
            for(let i=0; i<result.length;i++){
                if(result[i].kullanici_adi == req.body.kullanici_adi && result[i].sifre == req.body.sifre && result[i].kullanici_tipi == req.body.kullanici_tipi ){
                    login = true
                }
            }
            // Kullanıcı sistemde bulunmazsa konsola uyarı mesajı bastırıyor
            if(login == false ){
                console.log("Giriş başarısız. Lütfen girdilerinizi değiştiriniz.");
            }

            // Kulanıcı tipi kontrolü
            if(req.body.kullanici_tipi == "yonetici"){
                loginYon=true;
            }
            if(req.body.kullanici_tipi == "calisan"){
                loginCalis=true;
            }
            if(req.body.kullanici_tipi == "musteri"){
                loginMus=true;
            }

            // Giriş yapıldığı kontrol edildikten sonra hangi tipte kullanıcı girişi yapıldığına göre sayfaya yönlendiriyor.
            if(login == true && loginYon == true){
               console.log("Başarılı bir şekilde yönetici olarak giriş yapıldı.") ;
               res.redirect('/yonetici');
            }
            if(login == true && loginCalis == true){
                console.log("Başarılı bir şekilde çalışan olarak giriş yapıldı.");
                res.redirect('/calisan');
            }
            if(login == true && loginMus == true){
                console.log("Başarılı bir şekilde müşteri olarak giriş yapıldı.");
                res.redirect('/musteri');
            }
        })
        .catch((err)=>{
            console.log(err)
        })
});  

// Müşteri
app.get('/musteri',(req,res)=>{
    let kullaniciSayisi = 0;

    // Sisteme kayıtlı kullanıcıların musteri.ejs üzerinden işlem yapılarak ekrana bastırılması için 137. satırda render üzerinden yolluyor.
    User.find()
    .then((result)=>{
        // Sistemde kayıtlı müşterilerin sayısının gösterilmesi
        for(let i=0; i<result.length;i++){
            if((result[i].kullanici_tipi == "musteri" )){
                kullaniciSayisi++;
            }
        }
        res.render('musteri',{ title: 'Musteri' , kullaniciSayisi});
    })
    .catch((err)=>{
        console.log(err);
    })
})

// Çalışan
app.get('/calisan',(req,res)=>{
    let kullanicilar = [];

    // Sisteme kayıtlı kullanıcıların calisan.ejs üzerinden işlem yapılarak ekrana bastırılması için 160. satırda render üzerinden yolluyor.
    User.find()
        .then((result)=>{

            for(let i=0; i<result.length;i++){
                // Kullanıcıların adı, şifresi ve kullanıcı tipinin, o kullanıcı yönetici olmadığı sürece kullanıcılar'a eklenmesi ve ilgili EJS dosyası üzerinden kullanıcılar'la işlem yapılmasının sağlanması.
                if(!(result[i].kullanici_tipi == "yonetici")){
                    kullanicilar.push(`Kullanıcı: `);
                    kullanicilar.push("Kullanıcı adı: " + result[i].kullanici_adi) ;
                    kullanicilar.push("Şifre: " + result[i].sifre);
                }
            }
            res.render('calisan',{ title: 'Calisan' , kullanicilar});
        })
        .catch((err)=>{
            console.log(err);
        })
})

// Yönetici
app.get('/yonetici',(req,res)=>{
    
    let kullanicilar = [];

    // Sisteme kayıtlı kullanıcıların yonetici.ejs üzerinden işlem yapılarak ekrana bastırılması için 183. satırda render üzerinden yolluyor.
    User.find()
        .then((result)=>{
            for(let i=0; i<result.length;i++){
                // Kullanıcıların adı, şifresi, kullanıcı tipi ve id'sinin kullanıcılar'a eklenmesi ve ilgili EJS dosyası üzerinden kullanıcılar'la işlem yapılmasının sağlanması.
                kullanicilar.push(`${i+1}. Kullanıcı: `);
                kullanicilar.push("Kullanıcı adı: " + result[i].kullanici_adi) ;
                kullanicilar.push("Şifre: " + result[i].sifre);
                kullanicilar.push("Kullanıcı tipi: " + result[i].kullanici_tipi);
                kullanicilar.push("Kullanıcı id: " + result[i]._id);
            }
            res.render('yonetici',{ title: 'Yonetici' , kullanicilar});
        })
        .catch((err)=>{
            console.log(err);
        })
})

// create'ı renderlıyor
app.get('/create',(req,res)=>{
    res.render('create', { title: 'Kayit' });
})

// odev'i renderlıyor
app.get('/', (req, res) => {
    res.render('project', { title: 'Anasayfa' });
});

// Kalan durumlarda 404 statüsü ile hata sayfasını renderlıyor
app.use((req,res)=>{
    res.status(404).render('hata', {title: 'Hata'});
});