import { Repository } from "typeorm";
import Product from "../entities/Product";

// criar e já exportar a classe
export default class ProductRepository extends Repository<Product> {
    
    // exemplo de um método de busca por Nome - algo customizado
    // assíncrono
    public async findByName(name: string): Promise<Product | undefined> {

        const product = await this.findOne({
            where: {
                name
            }
        })

        return product;
    } 
}