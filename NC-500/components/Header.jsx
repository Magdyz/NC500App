import { Appbar, Avatar} from "react-native-paper";
import { StyleSheet } from "react-native";

const Header = ({title}) => {
  return (
    <Appbar.Header style={styles.header}>
      <Appbar.Content title={title} />
      <Avatar.Image size={55} source={require("../assets/NC500-Logo800.jpg")} />
    </Appbar.Header>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#C9CBA3",
  },
});


export default Header;
