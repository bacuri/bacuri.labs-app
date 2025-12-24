import { createStackNavigator } from '@react-navigation/stack';
import { useTranslation } from 'react-i18next';

import ProfileList from '../pages/ProfileList';
import Dependent from '../pages/Dependent';
import AddDependent from '../pages/AddDependent';
import MyVaccines from '../pages/MyVaccines';
import ApplyVaccine from '../pages/ApplyVaccine';
import Campaigns from '../pages/Campaigns';
import CampaignDetail from '../pages/CampaignDetail';
import CampaignMap from '../pages/CampaignMap';

const Stack = createStackNavigator();

const screenOptions = {
  headerStyle: {
    backgroundColor: '#22292F',
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
};

function SignInStack() {
  const { t } = useTranslation();

  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name="ProfileList"
        component={ProfileList}
        options={{ headerShown: false, headerTitle: t('routes.profileList') }}
      />
      <Stack.Screen
        name="Dependent"
        component={Dependent}
        options={{ headerTitle: t('routes.dependent') }}
      />
      <Stack.Screen
        name="MyVaccines"
        component={MyVaccines}
        options={{ headerTitle: t('routes.myVaccines') }}
      />
      <Stack.Screen
        name="AddDependent"
        component={AddDependent}
        options={{ headerTitle: t('routes.addDependent') }}
      />
      <Stack.Screen
        name="ApplyVaccine"
        component={ApplyVaccine}
        options={{ headerTitle: t('routes.applyVaccine') }}
      />
      <Stack.Screen
        name="Campaigns"
        component={Campaigns}
        options={{ headerTitle: t('routes.campaigns') }}
      />
      <Stack.Screen
        name="CampaignDetail"
        component={CampaignDetail}
        options={{ headerTitle: t('routes.campaignDetail') }}
      />
      <Stack.Screen
        name="CampaignMap"
        component={CampaignMap}
        options={{ headerTitle: t('routes.campaignMap') }}
      />
    </Stack.Navigator>
  );
}

export default SignInStack;
