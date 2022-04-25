# WebProject
Javascript, HTML, Node, Nodemon, Express, MongoDB, Mangoose ve ViewEngine kullanılarak oluşturulan bir projeyi içerir.

models klasöründe mongoose ile kullanıcı modeli oluşturma bulunmaktadır.

views klasöründe ViewEngine olarak kullanılan EJS dosyaları bulunmaktadır.

Hazır modül olarak chatbox modülü txt.me üzerinden alınmıştır. Bunun dışındaki modüller node_modules üzerinden görülebilir.

Konsolda dosya directory'si üzerinden node project veya nodemon project yazılarak çalıştırılabilir.

Bir tarayıcıdan girip localhost:3000 yazılarak erişim sağlanabilir.

Tarayıcı ilk açıldığında kullanıcının karşısına giriş ekranı çıkar ve kayıtlı olmadığı sürece giriş yapamaz. Kayıt yapılması için kayıt sayfasına yönlendirme giriş sayfasında bulunur. Farklı kullanıcı tiplerinde aynı kullanıcı adı ve şifreli kullanıcı tanımlanabilir. Giriş yaparken kullanıcı tipi seçiminin sebebi budur. Kullanıcı, sistemde bulunuyorsa giriş yaparken kullanıcı tipi kontrol edilir ve buna göre yönlendirme yapılır. Müşteri sayfasında sadece sisteme kayıtlı müşteri sayısı belirtilir. Çalışan sayfasında müşteri ve çalışan tipindeki kullanıcıların kullanıcı adı ve şifresi gösterilir. Yönetici sayfasında bütün kullanıcıların kullanıcı adı, şifresi, kullanıcı tipi ve id'si gösterilir. Bütün sayfalarda ana sayfaya yönlendirme ve buna ek olarak ekranın sağ altında chatbox bulunur. Bu chatboxtan yazılanlara operatör, txt.me adresinden cevap verebilir. Belli durumlarda konsoldan geri bildirim yapılır.
