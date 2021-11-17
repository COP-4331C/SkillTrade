import React from 'react';
import { ScrollView, View, Text, Button, StyleSheet } from 'react-native';

const TermsScreen = ({navigation}) => {
    return (
      <View style={styles.container}>
        <ScrollView> 
          <View style={[styles.sectionContainer, {marginTop:15}]}>
            <Text style={styles.sectionTitle}> Terms and conditions  </Text>
            <Text style={styles.about}>[Just a place holder page]</Text>
            <Text style={styles.about}>
              欢迎使用 XXXXXXX 的系列网站一般使用条款网页，该网站系列于 
              DI “使用条款与隐私权政策”的欢迎网页上定义为 DI 网站。本网页说明您同意接受约束条款与条件之约束限制，作为初次访问与之后继续访问相关 DI 网站的条件。
              如果您不同意这些使用条款，请勿访问相关的 DI 网站。访问与使用 DI 网站即表明您同意接受这些使用条款的法律约束力。在浏览或注册 DI 网站之前，
              请仔细阅读我们的隐私权政策。 </Text>
            <Text style={styles.about}>
              使用条款 — 总则： 通过访问 DI 网站，您向 DI 声明与保证您已经审阅且同意 DI 网站的这些使用条款与“隐私权政策”，其中隐私权政策在此通过引用方式加入，
              成为本使用条款的一部份。您在此了解并同意，通过由访问 DI 网站，您同意这些使用条款构成您与 DI 之间的约束性协议。通过访问或使用 DI 网站，
              您同意将相关信息转移到美国或 DI 方所处之任何其他国家、其关联方或服务提供商维护设施，且您同意根据 DI 隐私权政策的说明使用与披露关于您的信息。
              您进一步声明您至少已年满 18 岁（或至少是您查看 DI 网站之司法管辖区的最低法定年龄，允许您接受这些使用条款的约束，以及访问 DI 网站）。
              您不得违反本使用条款，以任何违法的用途使用 DI 网站。您也了解并同意 DI 可能因任何理由停止或限制您使用 DI 网站，将不另行通知。 </Text>
            <Text style={styles.about}>
              DI 可能随时变更这些使用条款或隐私权政策的任何条款或条件，将不另行通知。这些变更将出现在本使用条款中，您在公布任何变更之后访问 DI 
              网站将构成您对所有变更的同意。因此，在您每次访问 DI 网站时，以及第一次开始使用 DI 网站之前，您应阅读本使用条款与隐私权政策。
              您可以打印一份本使用条款做为参考。您了解并同意 DI 可以随时停止或变更部分或全部的 DI 网站，将不另行通知。
              访问或使用 DI 网站的公司： 除非 DI 与访问或使用 DI 网站的任何公司另行签署书面协议，本使用条款同样全面适用于那些公司，无所限制。
              终止与网站修订： 在其独立决定之下，DI 可能随时变更 DI 网站，包括去除或中止 DI 网站上的任何内容或功能。如果 DI 在其独立决定之下，
              判定您已经违反本协议的任何条款与条件或任何相关法律、法规或规定，或者是在任何时间因任何原因或无原因，DI 也可立即终止您对 DI 网站或任何相关部分的访问或使用。
              注册信息： 如果任何或所有的 DI 网站要求您的注册，您同意 (i) 依据相关服务注册程序提供关于您自己的准确、最新与完整信息，以及 (ii) 维持与更新您的信息，
              保持其准确性、及时性与完整性。您可以通过相关 DI 网站的帐户网页更新您的注册信息。
            </Text>
          </View>

          <Button
            title="Go back" 
            onPress={() => navigation.navigate('SignUpScreen')}
          />

        </ScrollView> 
      </View>
    );
};

export default TermsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
  about: {
    fontSize: 15,
    fontWeight: "500",
    // color: black,
    marginTop: 6,
    lineHeight: 20
  },
  sectionTitle: {
    fontWeight: "700",
    // color: ,
    fontSize: 28
  },
  sectionContainer: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    // marginBottom: 8,
    // backgroundColor: 
  },
});