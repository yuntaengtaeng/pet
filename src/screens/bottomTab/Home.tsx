import HomeProvider from '../../components/home/HomeProvider';
import Header from '../../components/home/Header';
import ProductList from '../../components/home/ProductList';
import Container from '../../components/layout/Container';

const Home = () => {
  return (
    <HomeProvider>
      <Header />
      <Container>
        <ProductList />
      </Container>
    </HomeProvider>
  );
};

export default Home;
