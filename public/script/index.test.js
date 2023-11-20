import { test } from "node:test";
import assert from "node:assert/strict";
import ConversorRomanos from "./conversor.js";

const conversor = new ConversorRomanos;

test.describe('arabic > roman check', () => {
    test.it('must return valid single values', () => {
        assert.strictEqual(conversor.conversorArabicoRomano(1),    'I');
        assert.strictEqual(conversor.conversorArabicoRomano(5),    'V',);
        assert.strictEqual(conversor.conversorArabicoRomano(10),   'X',);
        assert.strictEqual(conversor.conversorArabicoRomano(50),   'L',);
        assert.strictEqual(conversor.conversorArabicoRomano(100),  'C');
        assert.strictEqual(conversor.conversorArabicoRomano(500),  'D');
        assert.strictEqual(conversor.conversorArabicoRomano(1000), 'M');
    });

    test.it('must return valid subtracted values', () => {
        assert.strictEqual(conversor.conversorArabicoRomano(4),   'IV');
        assert.strictEqual(conversor.conversorArabicoRomano(9),   'IX');
        assert.strictEqual(conversor.conversorArabicoRomano(40),  'XL');
        assert.strictEqual(conversor.conversorArabicoRomano(90),  'XC');
        assert.strictEqual(conversor.conversorArabicoRomano(400), 'CD');
        assert.strictEqual(conversor.conversorArabicoRomano(900), 'CM');
    });

    test.it('must return valid values other than those pre-estabilished', () => {
        assert.strictEqual(conversor.conversorArabicoRomano(7),    'VII');
        assert.strictEqual(conversor.conversorArabicoRomano(23),   'XXIII');
        assert.strictEqual(conversor.conversorArabicoRomano(123),  'CXXIII');
        assert.strictEqual(conversor.conversorArabicoRomano(394),  'CCCXCIV');
        assert.strictEqual(conversor.conversorArabicoRomano(1032), 'MXXXII');
        assert.strictEqual(conversor.conversorArabicoRomano(2847), 'MMDCCCXLVII');
        assert.strictEqual(conversor.conversorArabicoRomano(3999), 'MMMCMXCIX');
    });

    test.it('mustn\'t accept not number characters', () => {
        assert.strictEqual(conversor.conversorArabicoRomano('?'), undefined);
        assert.strictEqual(conversor.conversorArabicoRomano('a'), undefined);
        assert.strictEqual(conversor.conversorArabicoRomano('A'), undefined);
        assert.strictEqual(conversor.conversorArabicoRomano('Ø'), undefined);
        assert.strictEqual(conversor.conversorArabicoRomano('#'), undefined);
        assert.strictEqual(conversor.conversorArabicoRomano('.'), undefined);
    });

    test.it('mustn\'t accept values over 3999', () => {
        assert.strictEqual(conversor.conversorArabicoRomano(4000), undefined);
        assert.strictEqual(conversor.conversorArabicoRomano(4100), undefined);
        assert.strictEqual(conversor.conversorArabicoRomano(6871), undefined);
    });

    test.it('mustn\'t accept values under 0', () => {
        assert.strictEqual(conversor.conversorArabicoRomano(-1), undefined);
        assert.strictEqual(conversor.conversorArabicoRomano(-33), undefined);
        assert.strictEqual(conversor.conversorArabicoRomano(-1000), undefined);
    });
});

test.describe('roman > arabic check', () => {
    test.it('must return valid single values', () => {
        assert.strictEqual(conversor.conversorRomanoArabico('I'),1);
        assert.strictEqual(conversor.conversorRomanoArabico('V'),5);
        assert.strictEqual(conversor.conversorRomanoArabico('X'),10);
        assert.strictEqual(conversor.conversorRomanoArabico('L'),50);
        assert.strictEqual(conversor.conversorRomanoArabico('C'),100);
        assert.strictEqual(conversor.conversorRomanoArabico('D'),500);
        assert.strictEqual(conversor.conversorRomanoArabico('M'),1000);
    });

    test.it('must return valid subtracted values', () => {
        assert.strictEqual(conversor.conversorRomanoArabico('IV'),4);
        assert.strictEqual(conversor.conversorRomanoArabico('IX'),9);
        assert.strictEqual(conversor.conversorRomanoArabico('XL'),40);
        assert.strictEqual(conversor.conversorRomanoArabico('XC'),90);
        assert.strictEqual(conversor.conversorRomanoArabico('CD'),400);
        assert.strictEqual(conversor.conversorRomanoArabico('CM'),900);
    });

    test.it('must return valid values other than those pre-estabilished', () => {
        assert.strictEqual(conversor.conversorRomanoArabico('VII'),        7);
        assert.strictEqual(conversor.conversorRomanoArabico('XXIII'),      23);
        assert.strictEqual(conversor.conversorRomanoArabico('CXXIII'),     123);
        assert.strictEqual(conversor.conversorRomanoArabico('CCCXCIV'),    394);
        assert.strictEqual(conversor.conversorRomanoArabico('MXXXII'),     1032);
        assert.strictEqual(conversor.conversorRomanoArabico('MMDCCCXLVII'),2847);
        assert.strictEqual(conversor.conversorRomanoArabico('MMMCMXCIX'),  3999);
    });

    test.it('mustn\'t accept not roman numeral characters', () => {
        assert.strictEqual(conversor.conversorRomanoArabico('F'), undefined);
        assert.strictEqual(conversor.conversorRomanoArabico('-'), undefined);
        assert.strictEqual(conversor.conversorRomanoArabico('P'), undefined);
        assert.strictEqual(conversor.conversorRomanoArabico('Ç'), undefined);
        assert.strictEqual(conversor.conversorRomanoArabico('z'), undefined);
        assert.strictEqual(conversor.conversorRomanoArabico('4'), undefined);
    });

    test.it('mustn\'t not allow values repeating itself more than 3 times in a sequence', () => {
        assert.strictEqual(conversor.conversorRomanoArabico('IIII'),  undefined);
        assert.strictEqual(conversor.conversorRomanoArabico('VVVVV'), undefined);
        assert.strictEqual(conversor.conversorRomanoArabico('XXXXX'), undefined);
        assert.strictEqual(conversor.conversorRomanoArabico('LLLLL'), undefined);
    });

    test.it('mustn\'t not convert value if it contains incorrect subtractions', () => {
        assert.strictEqual(conversor.conversorRomanoArabico('LC'), undefined);
        assert.strictEqual(conversor.conversorRomanoArabico('DM'), undefined);
        assert.strictEqual(conversor.conversorRomanoArabico('XM'), undefined);
        assert.strictEqual(conversor.conversorRomanoArabico('IIV'), undefined);
        assert.strictEqual(conversor.conversorRomanoArabico('CMIM'), undefined);
        assert.strictEqual(conversor.conversorRomanoArabico('VXLCIVDIM'), undefined);
    });
});

test.describe('check greater neighbor validation method', () => {
    test.it('must return true if neighbor value is greater', () => {
        assert.strictEqual(conversor.menorQueVizinho('L', 'C'), true);
        assert.strictEqual(conversor.menorQueVizinho('I', 'M'), true);
        assert.strictEqual(conversor.menorQueVizinho('V', 'L'), true);
        assert.strictEqual(conversor.menorQueVizinho('IV', 'M'), true);
        assert.strictEqual(conversor.menorQueVizinho('XL', 'L'), true);
        assert.strictEqual(conversor.menorQueVizinho('CD', 'M'), true);
        assert.strictEqual(conversor.menorQueVizinho('IX', 'CM'), true);
        assert.strictEqual(conversor.menorQueVizinho('IV', 'IX'), true);
        assert.strictEqual(conversor.menorQueVizinho('CD', 'CM'), true);
    });

    test.it('must return undefined if neighbor value is not greater', () => {
        assert.strictEqual(conversor.menorQueVizinho('C', 'L'), undefined);
        assert.strictEqual(conversor.menorQueVizinho('M', 'I'), undefined);
        assert.strictEqual(conversor.menorQueVizinho('L', 'V'), undefined);
        assert.strictEqual(conversor.menorQueVizinho('M', 'IV'), undefined);
        assert.strictEqual(conversor.menorQueVizinho('L', 'XL'), undefined);
        assert.strictEqual(conversor.menorQueVizinho('M', 'CD'), undefined);
        assert.strictEqual(conversor.menorQueVizinho('CM', 'IX'), undefined);
        assert.strictEqual(conversor.menorQueVizinho('IX', 'IV'), undefined);
        assert.strictEqual(conversor.menorQueVizinho('CM', 'CD'), undefined);
    });

    test.it('must return true if subtracted value repeats itself', () => {
        assert.strictEqual(conversor.menorQueVizinho('IV', 'IV'), true);
        assert.strictEqual(conversor.menorQueVizinho('IX', 'IX'), true);
        assert.strictEqual(conversor.menorQueVizinho('XL', 'XL'), true);
        assert.strictEqual(conversor.menorQueVizinho('XC', 'XC'), true);
        assert.strictEqual(conversor.menorQueVizinho('CD', 'CD'), true);
        assert.strictEqual(conversor.menorQueVizinho('CM', 'CM'), true);
    });
}); 

test.describe('check subtraction validator method', () => {
    test.it('must return undefined if there is no neighbor value', () => {
        assert.strictEqual(conversor.subtracaoInvalida('I'), undefined);
        assert.strictEqual(conversor.subtracaoInvalida('V'), undefined);
        assert.strictEqual(conversor.subtracaoInvalida('L'), undefined);
        assert.strictEqual(conversor.subtracaoInvalida('IV'), undefined);
        assert.strictEqual(conversor.subtracaoInvalida('XL'), undefined);
        assert.strictEqual(conversor.subtracaoInvalida('CM'), undefined);
    });

    test.it('must return true if it finds invalid subtractions in the value', () => {
        assert.strictEqual(conversor.subtracaoInvalida('VC'), true);
        assert.strictEqual(conversor.subtracaoInvalida('LC'), true);
        assert.strictEqual(conversor.subtracaoInvalida('IIV'), true);
        assert.strictEqual(conversor.subtracaoInvalida('CDM'), true);
        assert.strictEqual(conversor.subtracaoInvalida('IXM'), true);
        assert.strictEqual(conversor.subtracaoInvalida('CMC'), true);
        assert.strictEqual(conversor.subtracaoInvalida('DMIM'), true);
        assert.strictEqual(conversor.subtracaoInvalida('CIVD'), true);
        assert.strictEqual(conversor.subtracaoInvalida('XILD'), true);
    }) 

    test.it('must return undefined if it does not find invalid subtractions in the value', () => {
        assert.strictEqual(conversor.subtracaoInvalida('XC'), undefined);
        assert.strictEqual(conversor.subtracaoInvalida('CM'), undefined);
        assert.strictEqual(conversor.subtracaoInvalida('XCIV'), undefined);
        assert.strictEqual(conversor.subtracaoInvalida('XLIX'), undefined);
        assert.strictEqual(conversor.subtracaoInvalida('MXXXII'), undefined);
        assert.strictEqual(conversor.subtracaoInvalida('CCCXCIV'), undefined);
    });
});
