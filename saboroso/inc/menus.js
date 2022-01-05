let conn = require('./db');
const { save } = require('./reservation');
let path = require('path');
module.exports = {
    getMenus(){
        return new Promise((resolve, reject)=>{
            conn.query(
                "select * from tb_menus ORDER BY title",
                (err, results)=> {
                    if(err){
                        reject(err);
                    }
                    resolve(results);
                });
        });
    },
        save(fields, files){
            return new Promise((resolve, reject)=>{
                fields.photo = `images/${path.parse(files.photo.newFilename).base}`;
                let query, params;
                if (parseInt(fields.id) > 0 ){ 
                    query = "UPDATE tb_menus SET title = ?, description = ? , price = ? , photo = ? WHERE id = ?",
                    params = [
                    fields.title,
                    fields.description,
                    fields.price,
                    fields.photo,
                    fields.id
                    ];
                }else{
                    query= "INSERT INTO tb_menus (title, description, price, photo) VALUES (?,?,?,?)",
                        params = [
                        fields.title,
                        fields.description,
                        fields.price,
                        fields.photo
                        ];
                    }
                    conn.query(query, params, (err, results)=>{
                        
                            if(err){
                                console.log(err);
                                reject(err);
    
                            }else{
                                resolve(results);
                            }         
                    });          
                });
        },
        delete(id){
            return new Promise((resolve, reject)=>{
            conn.query('DELETE FROM tb_menus WHERE id = ?',[
                id
            ], (err, results)=>{
                if(err){
                    console.log(err);
                    reject(err);

                }else{
                    resolve(results);
                }   
            });
        
        })
    }
};