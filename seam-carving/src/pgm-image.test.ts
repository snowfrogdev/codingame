import { PgmImage } from './pgm-image';

describe('Seam Carving', () => {
    test('Height 1 & Width 1, -1', () => {
        const input = 
`P2
1 1
# 0
255
123`        
        const image = new PgmImage(input)

        const actual = image.removeSeam()

        const expected = '0'

        expect(actual).toBe(expected)
    })

    test('Height 1 & Width 2, -1', () => {
        const input = 
`P2
2 1
# 1
255
123 82`        
        const image = new PgmImage(input)

        const actual = image.removeSeam()

        const expected = '0'

        expect(actual).toBe(expected)
    })

    test('Height 1 & Width 3, -1', () => {
        const input = 
`P2
3 1
# 2
255
123 82 232`        
        const image = new PgmImage(input)

        const actual = image.removeSeam()

        const expected = '0'

        expect(actual).toBe(expected)
    })

    test('Height 2 & Width 3, -1', () => {
        const input = 
`P2
3 2
# 2
255
123 82 232
75 36 127`        
        const image = new PgmImage(input)

        const actual = image.removeSeam()

        const expected = '0'

        expect(actual).toBe(expected)
    })

    test('Height 3 & Width 3, -1', () => {
        const input = 
`P2
3 3
# 2
255
123 82 232
75 36 127
251 78 32`        
        const image = new PgmImage(input)

        const actual = image.removeSeam()

        const expected = '56'

        expect(actual).toBe(expected)
    })

    test('Height 3 & Width 3, -1', () => {
        const input = 
`P2
3 3
# 2
255
123 82 232
84 36 218
251 78 32`        
        const image = new PgmImage(input)

        const actual = image.removeSeam()

        const expected = '128'

        expect(actual).toBe(expected)
    })

    test('Height 3 & Width 4, -1', () => {
        const input = 
`P2
4 3
# 3
255
123 201 232 67
84 36 218 42
251 78 32 126`        
        const image = new PgmImage(input)

        const actual = image.removeSeam()

        const expected = '59'

        expect(actual).toBe(expected)
    })

    test('Height 3 & Width 5, -1', () => {
        const input = 
`P2
5 3
# 4
255
123 201 232 67 43
84 36 218 42 174
251 78 32 126 132`        
        const image = new PgmImage(input)

        const actual = image.removeSeam()

        const expected = '89'

        expect(actual).toBe(expected)
    })

    test('Height 4 & Width 3, -1', () => {
        const input = 
`P2
3 4
# 2
255
123 201 232
84 36 218
251 78 32
89 63 124`        
        const image = new PgmImage(input)

        const actual = image.removeSeam()

        const expected = '133'

        expect(actual).toBe(expected)
    })

    test('Height 5 & Width 3, -1', () => {
        const input = 
`P2
3 5
# 2
255
123 201 232
84 36 218
251 78 32
89 63 124
68 206 74`        
        const image = new PgmImage(input)

        const actual = image.removeSeam()

        const expected = '296'

        expect(actual).toBe(expected)
    })

    test('Height 5 & Width 4, -1', () => {
        const input = 
`P2
4 5
# 3
255
123 201 232 67
84 36 218 42
251 78 32 126
89 63 124 22
68 206 74 163`      
        const image = new PgmImage(input)

        const actual = image.removeSeam()

        const expected = '116'

        expect(actual).toBe(expected)
    })

    test('Height 5 & Width 5, -1', () => {
        const input = 
`P2
5 5
# 4
255
123 201 232 67 43
84 36 218 42 174
251 78 32 126 132
89 63 124 22 231
68 206 74 163 91`      
        const image = new PgmImage(input)

        const actual = image.removeSeam()

        const expected = '187'

        expect(actual).toBe(expected)
    })

    test('Height 8 & Width -1', () => {
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
        
        const image = new PgmImage(input)

        const actual = image.removeSeam()

        const expected = '175'

        expect(actual).toBe(expected)

    })

    test('Height 11 & Width -1', () => {
        const input =
`P2
27 11
# 26
255
66 68 61 63 64 63 63 76 71 71 81 72 78 72 77 86 84 74 79 69 65 67 77 80 75 75 77
49 62 61 52 59 72 74 78 77 74 74 70 77 81 72 76 92 80 65 64 77 89 87 75 66 76 67
56 57 55 57 57 56 59 78 74 75 70 59 74 79 64 58 73 77 78 69 73 80 70 74 70 59 64
70 94 104 105 82 82 48 48 80 67 61 68 69 75 57 69 80 65 83 71 87 87 85 101 114 110 83
87 143 137 162 167 158 110 72 80 79 59 47 67 80 62 70 105 73 90 90 138 145 142 168 166 149 85
63 146 137 104 146 161 134 120 138 151 140 56 74 72 65 70 155 164 149 156 171 175 165 148 171 125 74
100 131 114 60 57 89 137 92 73 99 148 82 77 72 63 83 140 97 98 98 142 114 127 53 91 140 78
110 77 99 62 68 82 103 96 69 63 84 90 81 86 84 88 88 65 69 80 112 69 117 64 62 78 116
90 44 94 65 68 69 100 96 60 61 71 70 84 75 72 65 60 70 63 88 86 60 99 67 57 60 131
66 46 73 73 61 71 100 85 52 55 64 56 55 59 61 80 79 66 56 88 69 60 96 64 54 69 93
59 52 63 69 61 48 60 55 52 65 78 81 81 78 90 87 78 71 70 71 66 68 73 66 67 82 63`

        const image = new PgmImage(input)

        const actual = image.removeSeam()

        const expected = '120'

        expect(actual).toBe(expected)

    })
})


