// 심화 참고해서 만들기

//서비스계층에서 가져오기
import { ProductsService } from '../services/products.service.js';

// Products의 컨트롤러(Controller)역할을 하는 클래스
export class ProductsController {
  // 소문자 프로덕츠서비스 : 대문자 프로덕츠컨드롤러 클래스에 멤버 변수로 할당
  productsService = new ProductsService();

  /** 상품 조회 API */
  getProducts = async (req, res, next) => {
    try {
      // 서비스 계층 findAllProducts 메서드 사용하기
      const products = await this.productsService.findAllProducts();

      return res.status(200).json({ data: products }); // 서비스에서 가져온 것 리스폰스로 할당
    } catch (err) {
      next(err);
    } //에러 전역 미들웨어로 에러 전달
  };

  /** 상품 생성 API */
  createProduct = async (req, res, next) => {
    try {
      const { userId, title, description, status } = req.body;

      // 서비스 계층 createProduct 메서드 사용
      const createdProduct = await this.productsService.createProduct(
        userId,
        title,
        description,
        status,
      );

      return res.status(201).json({ data: createdProduct });
    } catch (err) {
      next(err);
    }
  };
}
