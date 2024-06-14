import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View, Button, ScrollView } from 'react-native';
import { supabase } from './conexao';

export default function App() {
  const [produtoDigitado, setProdutoDigitado] = useState("");
  const [valorDigitado, setValorDigitado] = useState("");
  const [quantidadeDigitada, setQuantidadeDigitada] = useState("");
  const [compras, setCompras] = useState([]);

  
  const consultarCompras = async () => {
    const { data, error } = await supabase.from("tb_lista_compras").select("*");
    if (error) {
      alert("Falha ao consultar! " + error.message);
    } else {
      setCompras(data);
    }
  };

  useEffect(() => {
    consultarCompras();
  }, []);

  
  const cadastrarCompra = async () => {
    const { error } = await supabase.from("tb_lista_compras").insert([
      {
        coluna_produto: produtoDigitado,
        coluna_valor: valorDigitado,
        coluna_quantidade: quantidadeDigitada,
      },
    ]);
    if (error) {
      alert("Falha ao cadastrar! " + error.message);
    } else {
      alert("Compra cadastrada com sucesso!");
      consultarCompras();
      
      setProdutoDigitado("");
      setValorDigitado("");
      setQuantidadeDigitada("");
    }
  };

  return (
    <View style={estilos.container}>
      <Text style={{ fontSize: 20 }}>Cadastro de Compras</Text>
      <TextInput
        onChangeText={(texto) => setProdutoDigitado(texto)}
        value={produtoDigitado}
        placeholder="Digite o produto"
        style={estilos.caixaTexto}
      />
      <TextInput
        onChangeText={(texto) => setValorDigitado(texto)}
        value={valorDigitado}
        placeholder="Digite o valor"
        style={estilos.caixaTexto}
      />
      <TextInput
        onChangeText={(texto) => setQuantidadeDigitada(texto)}
        value={quantidadeDigitada}
        placeholder="Digite a quantidade"
        style={estilos.caixaTexto}
      />
      <Button title="Cadastrar" onPress={cadastrarCompra} />

      <ScrollView>
        {compras.map((item) => (
          <View key={item.id} style={estilos.cxCompras}>
            <Text> Produto: {item.coluna_produto} </Text>
            <Text> Valor: {item.coluna_valor} </Text>
            <Text> Quantidade: {item.coluna_quantidade} </Text>
          </View>
        ))}
      </ScrollView>
      <StatusBar style="auto" />
    </View>
  );
}

const estilos = StyleSheet.create({
  cxCompras: {
    borderWidth: 1,
    borderRadius: 8,
    minWidth: 300,
    padding: 10,
    marginBottom: 10,
  },
  caixaTexto: {
    borderWidth: 1,
    borderColor: "#c5c5c5",
    padding: 4,
    borderRadius: 4,
    marginBottom: 10,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    padding: 20,
    marginTop: 50,
  },
});
