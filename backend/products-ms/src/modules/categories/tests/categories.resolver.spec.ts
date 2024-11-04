import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesResolver } from '../categories.resolver';
import { CategoriesService } from '../categories.service';
import { CreateCategoryInput } from '../dto/create-category.input';
import { UpdateCategoryInput } from '../dto/update-category.input';

describe('CategoriesResolver', () => {
  let resolver: CategoriesResolver;
  let service: CategoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoriesResolver,
        {
          provide: CategoriesService,
          useValue: {
            findAll: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    resolver = module.get<CategoriesResolver>(CategoriesResolver);
    service = module.get<CategoriesService>(CategoriesService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of categories', async () => {
      const result = {
        result: {
          data: [{ id: '1', title: 'Category 1', slug: 'category-1', description: 'Description', parentId: null, referenceId: null, createdAt: new Date(), updatedAt: new Date(), products: [], deletedAt: null }],
          totalItems: 1,
          totalPages: 1,
          currentPage: 1,
          pageSize: 10,
        },
        message: 'Categories fetched successfully',
        statusCode: 200,
      };
      jest.spyOn(service, 'findAll').mockResolvedValue(result);

      expect(await resolver.findAll('', 1, 10)).toEqual(result);
    });
  });

  describe('findOne', () => {
    it('should return a single category', async () => {
      const result = {
        message: 'Category fetched successfully',
        statusCode: 200,
        data: {
          id: '1',
          title: 'Category 1',
          slug: 'category-1',
          description: 'Description',
          parentId: null,
          referenceId: null,
          createdAt: new Date(),
          updatedAt: new Date(),
          products: [],
          deletedAt: null,
        },
      };
      jest.spyOn(service, 'findOne').mockResolvedValue(result.data);

      expect(await resolver.findOne('1')).toEqual(result);
    });
  });

  describe('createCategory', () => {
    it('should create a new category', async () => {
      const createCategoryInput: CreateCategoryInput = { title: 'Category 1', description: 'Description' };
      const result = {
        message: 'Category created successfully',
        statusCode: 201,
        data: {
          id: '1',
          title: 'Category 1',
          description: 'Description',
          slug: 'category-1',
          parentId: null,
          referenceId: null,
          createdAt: new Date(),
          updatedAt: new Date(),
          products: [],
          deletedAt: null,
        },
      };
      jest.spyOn(service, 'create').mockResolvedValue(result.data);

      expect(await resolver.createCategory(createCategoryInput)).toEqual(result);
    });
  });

  describe('updateCategory', () => {
    it('should update a category', async () => {
      const updateCategoryInput: UpdateCategoryInput = { id: '1', title: 'Updated Category' };
      const result = {
        message: 'Category updated successfully',
        statusCode: 200,
      };
      jest.spyOn(service, 'update').mockResolvedValue(undefined);

      expect(await resolver.updateCategory(updateCategoryInput)).toEqual(result);
    });
  });

  describe('removeCategory', () => {
    it('should remove a category', async () => {
      const result = {
        message: 'Category removed successfully',
        statusCode: 204,
      };
      jest.spyOn(service, 'remove').mockResolvedValue(undefined);

      expect(await resolver.removeCategory('1')).toEqual(result);
    });
  });
});
