import MarkdownEditor from '../components/editor/MarkdownEditor';
import NavbarNested from '../components/navigation/Navbar';

const Home: React.FC = () => {
  return (
    <>
      <div style={{display: 'flex'}}>
        <div style={{width: '25%'}}>
          <NavbarNested/>
        </div>
        <div style={{width: '75%'}}>
          <MarkdownEditor/>
        </div>
      </div>
    </>
  )
}

export default Home;
