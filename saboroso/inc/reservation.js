var conn = require('./../inc/db');

module.exports = {
    
    render(req, res, error, success, headerIndex){

        res.render('reservation', {
            title: 'Reservas - Restaurante Saboroso!!',
            background: 'images/img_bg_2.jpg',
            h1: 'Reserve uma mesa',
            body: req.body,
            error: error,
            success: success,
            headerIndex: headerIndex
        });
    },
    save(filds){
        return new Promise((resolve, reject)=>{
            let date = filds.date.split('/');
            date=`${date[2]}-${date[1]}-${date[0]}`;
        conn.query("insert into tb_reservations (name,email,people,date,time) values (?,?,?,?,?)",[
            filds.name,
            filds.email,
            filds.people,
            date,
            filds.time
        ],(err, results)=>{
            if(err){
                reject(err);
            }else{
                resolve(results);
            }
        });
    });
    }
}