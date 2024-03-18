import { ReactNode, createContext, useState } from 'react';
import { NewPurchaseData } from '../pages/Checkout';
import { formatPrice } from '../utils/format';

interface ProductsContextProviderProps {
  children: ReactNode;
}

interface ProductProps {
  id: number;
  img: string;
  tags: string[];
  name: string;
  price: number;
  description: string;
  quantity: number;
  frete: number;
}

export interface PurchaseProps {
  products: ProductProps[];
  street: string;
  CEP: string;
  houseNumber: string;
  district: string;
  state: string;
  UF: string;
}

interface ProductsContextType {
  total: string;
  products: ProductProps[];
  purchase: PurchaseProps | null;
  addProductInCart: (product: ProductProps) => void;
  updateProductAmount: ({
    productId,
    amount,
  }: {
    productId: number;
    amount: number;
  }) => void;
  removeProduct: (productId: number) => void;
  createNewPurchase: (data: PurchaseProps) => void;
}

export const ProductsContext = createContext({} as ProductsContextType);

export function ProductsContextProvider({
  children,
}: ProductsContextProviderProps) {
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [purchase, setPurchase] = useState<PurchaseProps | null>(null);

  function addProductInCart(product: ProductProps) {
    const findProducts = products.find((p) => p.id === product.id);
    if (findProducts) {
      const totalQuantity = findProducts.quantity + product.quantity;
      updateProductAmount({
        productId: findProducts.id,
        amount: totalQuantity,
      });
      return;
    }
    setProducts((state) => [...state, product]);
  }

  function updateProductAmount({
    productId,
    amount,
  }: {
    productId: number;
    amount: number;
  }) {
    const productExist = products.some(
      (cartProduct) => cartProduct.id === productId
    );

    if (!productExist) {
      return;
    }

    const updateProducts = products.map((cartItem) =>
      cartItem.id === productId
        ? {
            ...cartItem,
            quantity: amount,
          }
        : cartItem
    );

    setProducts(updateProducts);
  }

  function removeProduct(productId: number) {
    const productExist = products.some(
      (cartProduct) => cartProduct.id === productId
    );

    if (!productExist) {
      return;
    }

    const updateProducts = products.filter(
      (cartItem) => cartItem.id !== productId
    );
    setProducts(updateProducts);
  }


  const total = formatPrice(
    products.reduce((sumTotal, product) => {
      sumTotal += 9.9 * product.quantity + product.frete;

      return sumTotal;
    }, 0)
  );

  function createNewPurchase(data: PurchaseProps) {
    const { UF, district, houseNumber, state, street, CEP } = data;

    const newPurchase = {
      street,
      houseNumber,
      district,
      state,
      UF,
      CEP,
      total: total,
      products: products,
    };

    setPurchase(newPurchase);
  }

  return (
    <ProductsContext.Provider
      value={{
        products,
        purchase,
        total,
        addProductInCart,
        updateProductAmount,
        removeProduct,
        createNewPurchase,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
}
