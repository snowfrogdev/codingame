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

        const actual = image.removeSeams()

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

        const actual = image.removeSeams()

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

        const actual = image.removeSeams()

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

        const actual = image.removeSeams()

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

        const actual = image.removeSeams()

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

        const actual = image.removeSeams()

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

        const actual = image.removeSeams()

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

        const actual = image.removeSeams()

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

        const actual = image.removeSeams()

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

        const actual = image.removeSeams()

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

        const actual = image.removeSeams()

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

        const actual = image.removeSeams()

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

        const actual = image.removeSeams()

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

        const actual = image.removeSeams()

        const expected = '120'

        expect(actual).toBe(expected)

    })

    test('Height 16 & Width -2', () => {
        const input =
`P2
31 16
# 29
255
226 227 226 228 216 200 197 178 177 187 186 127 128 102 89 145 166 123 147 161 151 113 92 89 114 148 126 81 100 141 179
229 229 229 231 222 219 227 225 215 209 197 140 101 92 70 90 122 156 164 113 110 94 104 118 103 81 92 92 116 143 190
237 232 233 233 236 238 240 244 246 244 248 224 198 109 56 112 139 215 231 137 134 106 124 113 90 87 86 127 197 217 230
243 242 245 246 244 243 244 244 243 243 244 215 200 116 63 150 206 255 230 167 135 139 94 121 193 133 152 221 242 240 236
243 243 245 247 247 246 246 247 245 246 248 209 206 184 65 130 197 232 234 102 132 218 171 171 210 210 192 237 236 236 235
240 239 242 244 244 241 241 244 244 242 241 226 246 219 59 101 219 240 241 203 207 248 244 235 247 247 240 236 239 241 242
243 239 236 236 246 250 248 247 245 236 233 231 237 204 78 78 165 239 231 240 242 238 242 247 243 241 239 237 239 239 238
246 250 245 244 196 165 182 194 206 235 237 243 244 208 56 75 132 231 231 230 231 234 236 237 239 240 239 237 239 240 242
240 208 231 157 58 72 99 118 131 100 102 146 226 223 66 90 134 222 236 232 232 232 233 235 234 235 234 234 237 239 242
200 42 72 71 61 96 76 81 90 62 65 67 131 248 95 94 143 220 238 231 229 233 233 231 243 246 249 250 248 248 243
115 4 15 27 48 56 33 48 60 57 43 37 83 223 116 56 134 193 208 197 210 226 214 160 167 177 187 185 187 205 236
38 14 23 22 39 33 28 34 27 23 24 25 70 185 104 74 135 178 187 192 187 134 106 83 93 83 101 80 101 141 196
68 5 38 32 18 16 22 15 14 9 67 90 46 159 119 132 155 174 173 186 106 43 59 101 79 61 88 67 95 158 187
158 83 152 93 15 16 36 45 26 24 112 202 83 124 175 173 177 173 183 176 105 123 143 110 89 118 118 136 120 138 170
154 164 182 114 52 63 96 172 161 121 135 179 150 130 170 173 178 178 183 187 188 186 172 158 141 190 196 195 160 175 178
183 174 174 160 139 150 181 185 190 185 188 183 185 182 190 185 189 192 194 193 194 188 188 190 191 190 189 188 193 190 192`

        const image = new PgmImage(input)

        const actual = image.removeSeams()

        const expected = 
`270
441`

        expect(actual).toBe(expected)

    })
})


