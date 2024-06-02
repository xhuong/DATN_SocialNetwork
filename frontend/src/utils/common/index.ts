import { IBookType } from "@/components/Product";

export const formatPrice = (price: number) => {
  return new Intl.NumberFormat("en-DE").format(price) + " VNĐ";
};

// export const totalPrice = (cart: IProductType[]) => {
//   if (cart.length > 0) {
//     let totalPrice = 0;
//     cart.map((cartItem: IProductType) => {
//       return (totalPrice += cartItem.count * cartItem.priceOfProduct);
//     });

//     return totalPrice;
//   }
// };

// export const totalPriceOfTrackingOrder = (array: ) => {
//   if (array?.length > 0) {
//     let totalPrice = 0;
//     array.map((item) => {
//       return (totalPrice += item.quantityOrdered * item.priceOfProduct);
//     });

//     return totalPrice;
//   }
// };

export interface IAuthor {
  id: number;
  name: string;
}
export interface IPublisher {
  id: number;
  name: string;
}

export interface IBookBE {
  id: number;
  isbn: string;
  name: string;
  price: number;
  available_quantity: number;
  year_of_publication: number;
  image_url: string;
  author_id: number;
  author: IAuthor;
  publisher_id: number;
  publisher: IPublisher;
  date_added: Date;
}

export const mapBackendDataToBookUI = (books: IBookBE[]): IBookType[] => {
  return books.map((book) => ({
    id: book.id,
    name: book.name,
    price: book.price,
    imgSrc: book.image_url,
    author: book.author.name,
    publisher: book.publisher.name,
  }));
};

export const getCountBooks = (array: any) => {
  let count = 0;
  if (array?.length > 0) {
    array.map((element: any) => {
      count += element.count;
    });
  }
  return count;
};
