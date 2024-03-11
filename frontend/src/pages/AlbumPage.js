import PageTitle from '../components/PageTitle';
import LoggedInName from '../components/LoggedInName';
import AlbumUI from '../components/AlbumUI';
const AlbumPage = () =>
{
    return(
        <div>
            <PageTitle />
            <LoggedInName />
            <AlbumUI />
        </div>
    );
}
export default AlbumPage;