const mongoose= require('mongoose');
const Schema = mongoose.Schema;

// Kullanıcı modeli oluşturmak için gerekli şema'yı oluşturma
const userSchema = new Schema({
    kullanici_adi: {
        type: String,
        required: true
    },
    sifre: {
        type: String,
        required: true
    },
    kullanici_tipi: {
        type: String,
        required: true
    }
}, {timestamps: true});

//Tanımlanan şema üzerinden User adında bir model oluşturulması
const User = mongoose.model('User', userSchema);
module.exports = User;