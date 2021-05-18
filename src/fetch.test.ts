import { fetchCorpInfo, boundRequestFactions } from './store/factions/FactionsActions'
import { IFaction } from './store/factions/models/factionsInterface';

const mockFaction: IFaction[] = [{
    corporation_id: 1000084,
    corporation: {
    },
    description: "The largest of the five main empires, the Amarr Empire is a sprawling patch-work of feudal-like provinces held together by the might of the emperor. Religion has always played a big part in Amarrian politics and the Amarrians believe they are the rightful masters of the world, souring their relations with their neighbours. Another source of ill-feelings on part of the other empires is the fact that the Amarrians embrace slavery.",
    name: "Amarr Empire",
    solar_system_id: 30002187,
    solar_system_name: "Amarr"
}]

describe('test data fetching', () => {

    test('check fetched array length', () => {
        return fetchCorpInfo(mockFaction).then(data => {
            expect(data).toHaveLength(1);
        });
    })

    test('check if corporation fetched', () => {
        return fetchCorpInfo(mockFaction).then(data => {
            expect(data[0]).toHaveProperty('corporation');
        });
    })

    test('check thunk fetched', () => {
        return fetchCorpInfo(mockFaction).then(data => {
            expect(data[0].corporation).toHaveProperty('ceo');
        });
    })

});
