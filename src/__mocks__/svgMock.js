// Mock para todos os SVGs importados
import { View } from "react-native";

// Componente default
const SvgMock = (props) => <View {...props} testID={props.testID} />;
SvgMock.displayName = "SvgMock";
export default SvgMock;

// Componente ReactComponent
const ReactSvgMock = (props) => <View {...props} testID={props.testID} />;
ReactSvgMock.displayName = "ReactSvgMock";
export const ReactComponent = ReactSvgMock;
