// 심화 참고한 것 수정

import { ProductsRepository } from '../repositories/posts.repository.js';

export class ProductsService {
  productsRepository = new ProductsRepository(); // 레포지토리 가져와서 인스턴트화

  /** 상품 조회 API를 구현하기 위해 findAllProducts 사용 */
  findAllProducts = async () => {
    // 저장소(Repository)에게 데이터를 요청
    const products = await this.productsRepository.findAllProducts();
    //레포가 어떻게 구성 되든, 여기서는 아무튼 파인드 올 프로덕츠 보고 어쨌든 가져와서 사용하는 구나 인지하면 된다.

    // 호출한 프로덕츠 가장 최신 게시글 부터 정렬합니다.
    products.sort((a, b) => {
      return b.createdAt - a.createdAt;
    });

    // 비즈니스 로직을 수행한 후 사용자에게 보여줄 데이터를 가공
    // 해당하는 특정 데이터를 빼서 파싱하는 작업도 수행
    return products.map((product) => {
      return {
        productId: product.productId,
        userId: product.userId,
        title: product.title,
        description: product.description,
        status: product.status,

        createdAt: product.createdAt,
        updatedAt: product.updatedAt,
      };
    });
  };

  createProduct = async (userId, title, status, description) => {
    // 저장소(Repository)에게 데이터를 요청
    const createdProduct = await this.productsRepository.createProduct(
      userId,
      status,
      title,
      description,
    );

    // 비즈니스 로직을 수행한 후 사용자에게 보여줄 데이터를 가공
    // 중요한 정보 외부로 노출시키지 않도록 서비스 계층에서 코드를 작성
    return {
      productId: createdProduct.productId,
      userId: createdProduct.userId,
      title: createdProduct.title,
      description: createdProduct.description,
      status: createdProduct.status,

      createdAt: createdProduct.createdAt,
      updatedAt: createdProduct.updatedAt,
    };
  };
}
