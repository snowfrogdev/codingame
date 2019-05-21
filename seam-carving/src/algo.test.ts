import { Pixel } from "./main";
import * as Algorithms from "./algo";

describe('Seam Carving, algorithm', () => {
    test('Should create a 2D of Pixels', () => {
        const input =
`P2
30 8
# 29
255
164 174 175 173 176 171 171 169 165 162 164 166 165 162 168 169 163 174 207 173 187 196 183 177 178 164 158 162 168 185
179 130 118 108 117 136 148 165 165 162 155 156 157 155 156 162 170 161 134 100 109 111 117 132 140 154 151 139 125 136
93 74 102 87 73 98 98 92 96 137 146 138 136 134 132 131 133 128 91 110 112 104 78 77 86 103 122 147 150 146
129 140 152 125 59 62 82 76 54 107 156 145 139 141 145 142 138 138 141 144 146 149 90 64 84 93 70 92 177 174
167 159 160 133 101 83 86 59 29 67 167 171 169 155 147 142 136 129 129 126 141 113 90 74 54 71 46 51 163 189
192 198 157 160 170 134 195 114 156 109 114 197 200 199 193 183 179 168 156 163 127 126 161 122 103 131 75 88 96 183
190 198 153 170 173 138 129 150 191 197 118 167 202 202 204 194 187 185 184 142 132 172 171 150 125 161 135 190 145 132
188 188 175 173 154 142 141 170 161 154 116 134 154 160 176 192 188 184 185 159 161 158 162 128 118 121 147 159 171 111`
        
    const actualRow0Col0 = Algorithms.createPixelArray(input)[0][0]
    const actualRow5Col5 = Algorithms.createPixelArray(input)[5][5]
    const actualLastRowLastCol = Algorithms.createPixelArray(input)[7][29]

    const expectedRow0Col0 = new Pixel(164)
    const expectedRow5Col5 = new Pixel(134)
    const expectedLastRowLastCol = new Pixel(111)

    expect(actualRow0Col0).toEqual(expectedRow0Col0)
    expect(actualRow5Col5).toEqual(expectedRow5Col5)
    expect(actualLastRowLastCol).toEqual(expectedLastRowLastCol)
    
    })
    
    /*test('Should compute energy value of pixel', () => {
        const algos = new Algorithms()

        const pixelArray = 

        const actual algos.computePixelGradiantMagnitude(pixelRow, pixelColumn, pixelArray)

        expect(actual).toBe()
    })*/


})