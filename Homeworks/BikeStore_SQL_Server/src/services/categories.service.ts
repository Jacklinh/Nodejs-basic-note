
import { Category } from '../databases/entities/category.entity';
import { myDataSource } from '../databases/data-soucre';

const categoryRepository = myDataSource.getRepository(Category)
// Lấy tất cả record
const findAll = async ()=>{
    const categories = await categoryRepository.find()
  return categories
}

export default {
    findAll
}