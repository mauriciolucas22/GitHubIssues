import { StackNavigator } from 'react-navigation';

//pages
import Repositories from './pages/repositories';
import Issues from './pages/issues';

const Routes = StackNavigator({
    Repositories: { screen: Repositories },
    Issues: { screen: Issues },//fim Issues
},//fim StackNavigator
{
    initialRouteName: 'Repositories',
}
);

export default Routes;