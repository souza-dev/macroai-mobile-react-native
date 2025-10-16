// __tests__/AccountScreen.test.tsx
import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import AccountScreen from '../../app/(app)/(tabs)/account/index';

describe('AccountScreen', () => {
    let getByText: any;
    let getByPlaceholderText: any;

    beforeEach(() => {
        const rendered = render(<AccountScreen />);
        getByText = rendered.getByText;
        getByPlaceholderText = rendered.getByPlaceholderText;
    });
    it('deve renderizar título, parágrafo, dropdowns, seletor de unidade e botão', () => {});
    it('deve permitir selecionar valores nos dropdowns', () => {});
    it('deve mostrar os valores corretos nos dropdowns', () => {});
    it('deve alternar unidades de metric para imperial corretamente', () => {});
    it('deve aceitar apenas números em idade, altura e peso', () => {});
    it('deve enviar os dados corretamente ao clicar no botão', () => {});
    it('navegar para a tela de edit de macros ao clicar no botão', () => {});

    // 1️⃣ Renderização básica
    it('deve renderizar título, parágrafo, dropdowns, seletor de unidade e botão', () => {
        expect(getByText('Account')).toBeTruthy();
        expect(getByText(/preencha seus dados/i)).toBeTruthy();

        const dropdowns = ['Diet', 'Objetivo', 'Idade', 'Altura', 'Peso', 'Gênero', 'Horas de Exercício'];

        dropdowns.forEach((label) => {
            expect(getByText(label)).toBeTruthy();
        });

        expect(getByText('kg')).toBeTruthy();
        expect(getByText('Lets Begin')).toBeTruthy();
    });

    // 2️⃣ Interação com dropdowns
    it('deve permitir selecionar valores nos dropdowns', () => {
        fireEvent.press(getByText('Diet'));
        fireEvent.press(getByText('Vegetariana'));
        expect(getByText('Vegetariana')).toBeTruthy();

        fireEvent.press(getByText('Objetivo'));
        fireEvent.press(getByText('Ganhar Massa'));
        expect(getByText('Ganhar Massa')).toBeTruthy();
    });

    // 3️⃣ Unidade de peso (kg/lbs)
    it('deve alternar unidade de peso corretamente', () => {
        const pesoInput = getByPlaceholderText('Peso');

        fireEvent.changeText(pesoInput, '70');
        expect(pesoInput.props.value).toBe('70');

        fireEvent.press(getByText('lbs'));
        // Supondo conversão 1 kg = 2.20462 lbs
        expect(pesoInput.props.value).toBeCloseTo(70 * 2.20462, 1);

        fireEvent.press(getByText('kg'));
        expect(pesoInput.props.value).toBe('70');
    });

    // 4️⃣ Entrada de valores numéricos
    it('deve aceitar apenas números em idade, altura e peso', () => {
        const idadeInput = getByPlaceholderText('Idade');
        fireEvent.changeText(idadeInput, 'abc');
        expect(idadeInput.props.value).toBe('');

        fireEvent.changeText(idadeInput, '25');
        expect(idadeInput.props.value).toBe('25');
    });

    // 5️⃣ Botão Lets Begin
    it('deve habilitar submit somente quando campos obrigatórios preenchidos', () => {
        const button = getByText('Lets Begin');
        expect(button.props.accessibilityState.disabled).toBe(true);

        // Preencher campos obrigatórios
        fireEvent.press(getByText('Diet'));
        fireEvent.press(getByText('Vegetariana'));
        fireEvent.changeText(getByPlaceholderText('Idade'), '25');
        fireEvent.changeText(getByPlaceholderText('Altura'), '180');
        fireEvent.changeText(getByPlaceholderText('Peso'), '70');

        // Agora o botão deve estar habilitado
        expect(button.props.accessibilityState.disabled).toBe(false);
    });

    // 6️⃣ Submissão do formulário
    it('deve enviar os dados corretamente ao clicar no botão', () => {
        const mockSubmit = jest.fn();
        render(<AccountScreen onSubmit={mockSubmit} />);

        fireEvent.press(getByText('Diet'));
        fireEvent.press(getByText('Vegetariana'));
        fireEvent.changeText(getByPlaceholderText('Idade'), '25');
        fireEvent.changeText(getByPlaceholderText('Altura'), '180');
        fireEvent.changeText(getByPlaceholderText('Peso'), '70');
        fireEvent.press(getByText('Lets Begin'));

        expect(mockSubmit).toHaveBeenCalledWith({
            diet: 'Vegetariana',
            objetivo: undefined, // depende de preenchimento
            idade: 25,
            altura: 180,
            peso: 70,
            genero: undefined,
            horasExercicio: undefined,
            unidadePeso: 'kg',
        });
    });
});
