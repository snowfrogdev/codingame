import { findClosestNumberII } from "./find-closest-numberii";

describe("closest number", () => {
  describe("codingame tests", () => {
    test("M has fewer digits", () => {
      const N = "94754";
      const M = "3841";

      const expected = findClosestNumberII(N, M);

      const actual = "8431";

      expect(expected).toBe(actual);
    });

    test("M has more digits", () => {
      const N = "2749";
      const M = "284512";

      const expected = findClosestNumberII(N, M);

      const actual = "122458";

      expect(expected).toBe(actual);
    });

    test("Exact solution", () => {
      const N = "123";
      const M = "231";

      const expected = findClosestNumberII(N, M);

      const actual = "123";

      expect(expected).toBe(actual);
    });

    test("Solution with leading zeros", () => {
      const N = "111";
      const M = "3204";

      const expected = findClosestNumberII(N, M);

      const actual = "234";

      expect(expected).toBe(actual);
    });

    test("Same number of digits, solution < N", () => {
      const N = "45284";
      const M = "17404";

      const expected = findClosestNumberII(N, M);

      const actual = "44710";

      expect(expected).toBe(actual);
    });

    test("Same number of digits, solution > N", () => {
      const N = "82738";
      const M = "33898";

      const expected = findClosestNumberII(N, M);

      const actual = "83389";

      expect(expected).toBe(actual);
    });

    test("No permutation greater than N", () => {
      const N = "93583";
      const M = "33428";

      const expected = findClosestNumberII(N, M);

      const actual = "84332";

      expect(expected).toBe(actual);
    });

    test("Longest common prefix is not always right", () => {
      const N = "590";
      const M = "506";

      const expected = findClosestNumberII(N, M);

      const actual = "605";

      expect(expected).toBe(actual);
    });

    test("Two optimal permutations", () => {
      const N = "77";
      const M = "95";

      const expected = findClosestNumberII(N, M);

      const actual = "59";

      expect(expected).toBe(actual);
    });

    test("M has more digits, with zeros", () => {
      const N = "8732";
      const M = "4000007";

      const expected = findClosestNumberII(N, M);

      const actual = "7400";

      expect(expected).toBe(actual);
    });

    test("Very large numbers 3", () => {
      const N =
        "167647336560000211699191433857463434198715296959479470104791387486490839178549336523503955184035032360907001649295585536672177182820062305051933445098658283449084029128187231904382889603431357451148146861153794972446521963275538568202837779776057456473856595227267855284388468897593089380813940022939901419635893375587740072557077266099417773070679657550556755770430425971527859575171386766064809142179942518578415109492053918408750745215903058488440967155340601703801822849851275540305032670258604838207322380233461024273213146214678904489796629550795361885900120551409270853397426746977568378885711518957081747900633746693899484431007413040221678725182364203656812904455750544178462283834461428441268716465373352553230236443621193232487801906412590304599280535194713258657550547040994292741745553453669346899957641789096541444293306731437376153383817814310122263168300764026932493882918384496420445598678331236813452901881452867530688060581387389131906097119052249764236222488335008048507370737541";
      const M =
        "775657767799888585668968939557795855595867765669658999876777655668777768999655877575895556878788878787785878898577661997977869897979799795879565577857568877867965955879657666955986689597965595589695666588856976587789799569869598886755567656709685859567858995899666897798957977866766767596867796999589999799886657555588957766688955656775799555596889888556799568675667798587879585876859858997989679799756986987696599666787668696757755878888689696659886966558689965878769777859999787768795865699698895786765955889666558998685859865968777895377966685978667867689766999556888567596659955899657569968578575675606855897556597577995866966665665978677875996969558777569877867687595766687967985756696578990987867556595857885896796865889586766576658865659877967585786955558755789689776786998555995769656668995887675667668697958789578697570695669878555777998676898987758997675676868657888676795998596578977577785585868798585664857969857659799885966785658799965889558697989889777558656888696688766855587786679767";

      const expected = findClosestNumberII(N, M);

      const actual =
        "167647336559999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999988888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888887777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777776666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666665555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555550000";

      expect(expected).toBe(actual);
    });
  });
});
