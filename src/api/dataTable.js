import faker from 'faker';

faker.seed(777);

export const makeFake = idx => {
  return {
    id: 11 + idx,
    name: faker.name.findName(),
    amount: faker.finance.amount(),
    transactionType: faker.finance.transactionType(),
    locationName: faker.address.city(),
    isActive: faker.random.boolean(),
    img: faker.image.avatar()
  };
};

const data = [...new Array(1000)].map((_, idx) => makeFake(idx));

export default {
  data
};
