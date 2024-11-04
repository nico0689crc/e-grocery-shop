import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoriesService } from '../categories.service';
import { Category } from '../entities/category.entity';
import { NotFoundException } from '@nestjs/common';

const mockCategoryRepository = () => ({
  findAndCount: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
  preload: jest.fn(),
  remove: jest.fn().mockResolvedValue(null),
  findBy: jest.fn(),
});

describe('CategoriesService', () => {
  let service: CategoriesService;
  let repository: Repository<Category>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoriesService,
        { provide: getRepositoryToken(Category), useFactory: mockCategoryRepository },
      ],
    }).compile();

    service = module.get<CategoriesService>(CategoriesService);
    repository = module.get<Repository<Category>>(getRepositoryToken(Category));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of categories', async () => {
      const result = [{ id: '1', title: 'Category 1' }];
      (repository.findAndCount as jest.Mock).mockResolvedValue([result, 1]);

      expect(await service.findAll({ search: '', page: 1, pageSize: 10 })).toEqual({
        result: {
          data: result,
          totalItems: 1,
          totalPages: 1,
          currentPage: 1,
          pageSize: 10,
        },
        message: 'Categories fetched successfully',
        statusCode: 200,
      });
    });
  });

  describe('findOne', () => {
    it('should return a single category', async () => {
      const category = { id: '1', title: 'Category 1' };
      (repository.findOne as jest.Mock).mockResolvedValue(category);

      expect(await service.findOne({ where: { id: '1' }, relations: [] })).toEqual(category);
    });

    it('should throw an error if category not found', async () => {
      (repository.findOne as jest.Mock).mockResolvedValue(null);

      await expect(service.findOne({ where: { id: '1' }, relations: [] })).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('create', () => {
    it('should create a new category', async () => {
      const createCategoryInput = { title: 'Category 1', description: 'Description of Category 1' };
      const category = { id: '1', ...createCategoryInput };
      (repository.save as jest.Mock).mockResolvedValue(category);

      expect(await service.create(createCategoryInput)).toEqual(category);
    });
  });

  describe('update', () => {
    it('should update a category', async () => {
      const updateCategoryInput = { id: '1', title: 'Updated Category' };
      const category = { id: '1', title: 'Category 1' };
      (repository.preload as jest.Mock).mockResolvedValue(category);
      (repository.save as jest.Mock).mockResolvedValue(category);

      await service.update(updateCategoryInput);
      expect(repository.save).toHaveBeenCalledWith(category);
    });

    it('should throw an error if category not found', async () => {
      (repository.preload as jest.Mock).mockResolvedValue(null);

      await expect(service.update({ id: '1', title: 'Updated Category' })).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('remove', () => {
    it('should remove a category', async () => {
      const category = { id: '1', title: 'Category 1' };
      (repository.findOne as jest.Mock).mockResolvedValue(category);
      (repository.remove as jest.Mock).mockResolvedValue(category);

      await service.remove('1');
      expect(repository.remove).toHaveBeenCalledWith(category);
    });

    it('should throw an error if category not found', async () => {
      (repository.findOne as jest.Mock).mockResolvedValue(null);

      await expect(service.remove('1')).rejects.toThrow(NotFoundException);
    });
  });
});
