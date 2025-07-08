import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, ILike, Repository } from "typeorm";
import { Categoria } from "../entities/categoria.entity";

@Injectable()
export class CategoriaService {
    constructor(
        @InjectRepository(Categoria)
        private categoriaRepository: Repository<Categoria>
    ) { }

    async findAll(): Promise<Categoria[]> {
        return await this.categoriaRepository.find({
        });
    }

    async findById(id: number): Promise<Categoria> {

        let categoria = await this.categoriaRepository.findOne({
            where: {
                id
            },
        });

        if (!categoria)
            throw new HttpException('Categoria não encontrada!', HttpStatus.NOT_FOUND);

        return categoria;
    }

    async findAllByDescricao(descricao: string): Promise<Categoria[]> {
        return await this.categoriaRepository.find({
            where: {
                descricao: ILike(`%${descricao}%`)
            }
        })
    }

    async create(Categoria: Categoria): Promise<Categoria> {
        return await this.categoriaRepository.save(Categoria);
    }

    async update(Categoria: Categoria): Promise<Categoria> {

        await this.findById(Categoria.id);

        return await this.categoriaRepository.save(Categoria);
    }

    async delete(id: number): Promise<DeleteResult> {

        await this.findById(id);

        return await this.categoriaRepository.delete(id);

    }

}