import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Testes do Módulo Produto (e2e)', () => {
  let app: INestApplication;
  let produtoId: number;
  let categoriaId: number;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    const categoriaResposta = await request(app.getHttpServer())
      .post('/categorias')
      .send({ nome: 'Remédio', descricao: 'Medicamento' })  
      .expect(201);

    categoriaId = categoriaResposta.body.id;
  });

  afterAll(async () => {
    await app.close();
  });

  it('01 - Deve cadastrar um novo Produto', async () => {
    const resposta = await request(app.getHttpServer())
      .post('/produtos')
      .send({
        nome: 'Dipirona',
        preco: 5.99,
        quantidade: 10,
        categoria: { id: categoriaId },
      })
      .expect(201);

    expect(resposta.body.nome).toBe('Dipirona');
    expect(resposta.body.categoria.id).toBe(categoriaId);
    produtoId = resposta.body.id;
  });

  it('02 - Deve listar todos os Produtos', async () => {
    const resposta = await request(app.getHttpServer())
      .get('/produtos')
      .expect(200);

    expect(Array.isArray(resposta.body)).toBe(true);
    expect(resposta.body.length).toBeGreaterThan(0);
  });

  it('03 - Deve buscar um Produto por ID', async () => {
    const resposta = await request(app.getHttpServer())
      .get(`/produtos/${produtoId}`)
      .expect(200);

    expect(resposta.body.id).toBe(produtoId);
  });

  it('04 - Deve atualizar um Produto', async () => {
    const resposta = await request(app.getHttpServer())
      .put(`/produtos/${produtoId}`)
      .send({
        nome: 'Dipirona 500mg',
        preco: 6.00,
        quantidade: 15,
        categoria: { id: categoriaId },
      })
      .expect(200);

    expect(resposta.body.nome).toBe('Dipirona 500mg');
    expect(resposta.body.preco).toBe(6.00);
  });

  it('05 - Deve deletar um Produto', async () => {
    await request(app.getHttpServer())
      .delete(`/produtos/${produtoId}`)
      .expect(204);
  });
});
