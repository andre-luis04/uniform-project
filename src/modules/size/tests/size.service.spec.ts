import { Test, TestingModule } from "@nestjs/testing";
import { SizeService } from "../size.service";
import { SizeEntity } from "../entities/size.entity";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { NotFoundException } from "@nestjs/common";

const mockSizeEntity = new SizeEntity();

describe("SizeService", () => {
  let service: SizeService;
  let repository: jest.Mocked<Repository<SizeEntity>>;

  const mockRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      imports: [SizeEntity],
      providers: [
        SizeService,
        { provide: getRepositoryToken(SizeEntity), useValue: mockRepository },
      ],
    }).compile();

    service = module.get<SizeService>(SizeService);
    repository = module.get(getRepositoryToken(SizeEntity));
  });

  describe("create", () => {
    it("deve criar um size", async () => {
      const createDto = { size: "M" };
      const createdSize = new SizeEntity();

      repository.create.mockReturnValue(createdSize);
      repository.save.mockResolvedValue(createdSize);

      const result = await service.create(createDto);

      expect(repository.create).toHaveBeenCalledWith(createDto);
      expect(repository.save).toHaveBeenCalledWith(createdSize);
      expect(result).toEqual(createdSize);
    });
  });
  describe("findAll", () => {
    it("deve retornar uma lista de sizes", async () => {
      repository.find.mockResolvedValue([mockSizeEntity]);
      const result = await service.findAll();
      expect(result).toEqual([mockSizeEntity]);
      expect(repository.find).toHaveBeenCalled();
    });
  });
  describe("findOne", () => {
    it("deve retornar um size pelo ID", async () => {
      repository.findOne.mockResolvedValue(mockSizeEntity);
      const result = await service.findOne("uuid-123");
      expect(result).toEqual(mockSizeEntity);
      expect(repository.findOne).toHaveBeenCalledWith({
        where: { id: "uuid-123" },
      });
    });
    it("deve retornar not found se não encontrar o size", async () => {
      repository.findOne.mockResolvedValue(null);
      await expect(service.findOne("uuid-notFound")).rejects.toThrow(
        NotFoundException
      );
    });
  });
  describe("patch", () => {
    it("deve atualizar um size", async () => {
      const updateDto = { size: "XL" };
      const mockUpdateResult = {
        generatedMaps: [],
        raw: [],
        affected: 1,
      };

      repository.findOne.mockResolvedValue(mockSizeEntity);
      repository.update.mockResolvedValue(mockUpdateResult);

      const result = await service.update("uuid-123", updateDto);

      
      expect(repository.update).toHaveBeenCalledWith(
        mockSizeEntity.id,
        updateDto
      );
      
      expect(result).toEqual(mockSizeEntity)
    });
    it("deve retornar not found se não encontrar o size", async () => {
      const updateDto = { size: "XL" };
      repository.findOne.mockResolvedValue(null);
      await expect(service.update("uuid-notFound", updateDto)).rejects.toThrow(
        NotFoundException
      );
    });
  });
  describe("delete", () => {
    it("deve deletar um size", async () => {
      repository.findOne.mockResolvedValue(mockSizeEntity);
      repository.remove.mockResolvedValue(mockSizeEntity);

      await service.remove("uuid-123");

      expect(repository.remove).toHaveBeenCalledWith(mockSizeEntity);
    });
    it("deve retornar not found se não encontrar o size", async () => {
      repository.findOne.mockResolvedValue(null);
      await expect(service.remove("uuid-notFound")).rejects.toThrow(
        NotFoundException
      );
    });
  });
});
