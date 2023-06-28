import HomeProvider from '../../components/home/HomeProvider';
import FixedWriteButton from '../../components/home/FixedWriteButton';
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
      <FixedWriteButton />
    </HomeProvider>
  );
};

export default Home;
