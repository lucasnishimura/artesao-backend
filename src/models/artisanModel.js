exports.ArtisanModel = class ArtisanModel {
	constructor(connection) {
			this.connection = connection; 
	}

	async store(data, callback) {
		await this.connection.query('insert into artisans set ?', data, callback);
	}
	
	async addIndicate(data){
		await this.connection.query('insert into indicate set ?', data);
	}

	async addProducts(id, products, callback){
		products.map(async (e) => {
			await this.connection.query(`insert into products (name, artisan_id) VALUES ('${e}',${id})`);
		})
	}

	async getArtisan(email, callback){
		await this.connection.query(`select * from artisans where email = '${email}'`, callback);
	}
	
	async getAll(callback){
		await this.connection.query(`select * from artisans`, callback);
	}
	
	async aproveAll(callback){
		await this.connection.query(`update artisans set status = 'aprovado' where status = 'pendente'`, callback);
	}

}