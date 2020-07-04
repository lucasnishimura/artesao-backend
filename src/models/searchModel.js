exports.SearchModel = class SearchModel {
	constructor(connection) {
			this.connection = connection; 
	}

	async getProducts(city, bairro, callback) {
        await this.connection.query(`select distinct p.name from products as p 
        inner join artisans as a ON a.id = p.artisan_id
        where a.city like '%${city}%' && a.bairro like '%${bairro}%'`, callback);
    }
    
    async getArtisans(city, bairro, produto, callback) {

        let cityCondition = (city != undefined) ? `and a.city like '%${city}%'` : '';
        let bairroCondition = (bairro != undefined) ? `and a.bairro like '%${bairro}%'` : '';
        let produtoCondition = (produto != undefined) ? `and p.name like '%${produto}%'` : '';
        

        const result = await this.connection.query(`
        select distinct a.* from artisans as a
        inner join products as p
        ON p.artisan_id = a.id where 1=1 ${cityCondition} ${bairroCondition} ${produtoCondition}`,callback);

        // console.log(result)
    }

    async getProductById(id, callback){
        await this.connection.query(`select name from products where artisan_id = ${id}`, callback);
    }
    
    
}