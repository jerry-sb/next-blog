# ESLint 구성 설정 설명서

이 문서는 ESLint 구성 파일의 각 설정 항목의 목적을 설명하고 필요한 패키지 설치에 대한 안내를 제공합니다.

## 구성 설정 개요

### `extends`
`extends` 속성은 다양한 플러그인 또는 권장 세트에서 제공하는 ESLint 구성을 확장할 수 있게 해줍니다:
- **`next/core-web-vitals`**: Next.js 프로젝트의 성능에 중요한 Core Web Vitals 개선을 돕는 규칙 세트를 포함합니다.
- **`plugin:prettier/recommended`**: Prettier를 ESLint에 통합하여 코드 스타일 일관성을 유지하고 ESLint와의 충돌을 방지합니다.
- **`plugin:react/recommended`**: React의 권장 규칙을 제공하여 React 모범 사례를 따르고 일반적인 오류를 잡아줍니다.
- **`plugin:import/errors` 및 `plugin:import/warnings`**: 이 플러그인은 누락된 import나 잘못 구성된 종속성과 같은 일반적인 import/export 문제와 경고를 방지하는 규칙을 제공합니다.
- **`eslint:recommended`**: 기본적인 코드 품질을 보장하기 위한 ESLint의 권장 규칙 세트를 포함합니다.
- **`plugin:@typescript-eslint/recommended`**: `@typescript-eslint` 플러그인에서 제공하는 TypeScript 권장 규칙을 포함하여 TypeScript 관련 일반적인 문제를 잡아줍니다.

### `parser`
- **`@typescript-eslint/parser`**: TypeScript 코드를 분석하여 ESLint가 TypeScript 특유의 구문을 올바르게 검사할 수 있도록 합니다.

### `parserOptions`
- **`ecmaVersion: 2021`**: ESLint가 ECMAScript 2021 기능을 사용하도록 설정하여 최신 JavaScript 구문을 지원합니다.
- **`sourceType: module`**: ES 모듈(`import`/`export`)을 사용함을 나타냅니다. 이는 최신 JavaScript 프로젝트에서 필요합니다.
- **`ecmaFeatures.jsx: true`**: JSX 지원을 활성화하여 React 컴포넌트를 검사하는 데 필요합니다.

### `plugins`
- **`@typescript-eslint`**: TypeScript 코드를 작성할 때 모범 사례를 강제하는 추가적인 ESLint 규칙을 제공합니다.

### `rules`
- **`@typescript-eslint/no-unused-vars`**: 사용되지 않는 변수가 있을 경우 오류를 발생시킵니다. `{ "argsIgnorePattern": "^_" }` 설정은 `_`로 시작하는 인수를 무시하도록 하여, 자리 표시자나 사용되지 않는 매개변수에 유용합니다.
- **`@typescript-eslint/explicit-function-return-type: off`**: 함수의 명시적 반환 타입을 강제하는 규칙을 비활성화하여, TypeScript의 타입 추론이 충분할 때 코드가 덜 장황하고 작성하기 쉽게 만듭니다.
- **`react/react-in-jsx-scope: off`**: React 17 이상에서는 JSX를 사용할 때 React를 import할 필요가 없으므로 이 규칙을 비활성화합니다.

## 필요한 패키지
이 구성을 사용하려면 다음 패키지를 설치해야 합니다:

```bash
npm install --save-dev eslint prettier eslint-config-prettier eslint-plugin-prettier eslint-plugin-react eslint-plugin-import @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-config-next
```

### 설치된 패키지 설명
- **`eslint`**: 주요 린터 도구.
- **`prettier`**: 코드 스타일 일관성을 위한 코드 포매터.
- **`eslint-config-prettier`**: ESLint와 Prettier 간의 충돌을 방지하기 위해 규칙을 비활성화합니다.
- **`eslint-plugin-prettier`**: Prettier를 ESLint에 통합하여 스타일 문제를 린팅 오류로 표시합니다.
- **`eslint-plugin-react`**: React에 특화된 린팅 규칙을 추가합니다.
- **`eslint-plugin-import`**: ES6 `import`/`export` 문을 더 잘 처리하기 위한 규칙을 제공합니다.
- **`@typescript-eslint/parser`**: TypeScript 코드를 ESLint가 분석할 수 있도록 합니다.
- **`@typescript-eslint/eslint-plugin`**: TypeScript에 특화된 규칙을 제공하는 ESLint 플러그인.
- **`eslint-config-next`**: Next.js 애플리케이션에서 모범 사례를 따르기 위한 Next.js 전용 린팅 규칙.

## 사용법
필요한 패키지를 설치한 후, `package.json`에 린트를 쉽게 실행할 수 있는 스크립트를 추가할 수 있습니다:

```json
"scripts": {
  "lint": "eslint . --ext .js,.jsx,.ts,.tsx",
  "lint:fix": "eslint . --ext .js,.jsx,.ts,.tsx --fix"
}
```

린터를 실행하려면 다음을 사용하십시오:
```bash
npm run lint
```
문제를 자동으로 수정하려면 다음을 사용하십시오:
```bash
npm run lint:fix
```

## 요약
이 ESLint 구성은 JavaScript, React, TypeScript, Next.js에 대한 권장 규칙을 사용하여 높은 수준의 코드 품질을 유지하고, Prettier를 통합하여 일관된 코드 포매팅을 제공합니다. 이러한 설정을 최대한 활용하려면 나열된 종속성을 반드시 설치하십시오.





```json
{
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false,
  "semi": true,
  "singleQuote": true,
  "jsxSingleQuote": false,
  "trailingComma": "es5",
  "bracketSpacing": true,
  "jsxBracketSameLine": false,
  "arrowParens": "always",
  "endOfLine": "lf"
}
```

#### 설정 설명
- **`printWidth`: 80**
    - 한 줄의 최대 길이를 설정합니다. 일반적으로 80이나 100으로 설정하는 것이 많이 사용됩니다. 줄 길이가 너무 길면 가독성이 떨어지기 때문에 적절히 제한하는 것이 좋습니다.

- **`tabWidth`: 2**
    - 탭의 폭을 설정합니다. 일반적으로 2 또는 4를 사용하며, 2는 더 많은 코드를 한 화면에 볼 수 있어 선호됩니다.

- **`useTabs`: false**
    - 탭 대신 스페이스를 사용합니다. 대부분의 스타일 가이드에서 스페이스를 권장하기 때문에 `false`로 설정합니다.

- **`semi`: true**
    - 문장 끝에 세미콜론을 추가합니다. 코드를 더 명확하게 하고 예기치 않은 오류를 방지하기 위해 세미콜론을 사용하는 것을 추천합니다.

- **`singleQuote`: true**
    - 문자열에 작은 따옴표(`'`)를 사용합니다. JavaScript 커뮤니티에서는 작은 따옴표를 사용하는 것이 일반적입니다.

- **`jsxSingleQuote`: false**
    - JSX에서는 큰 따옴표(`"`)를 사용합니다. HTML 속성과 일관성을 유지하기 위해 JSX에서는 큰 따옴표를 사용하는 것이 일반적입니다.

- **`trailingComma`: "es5"**
    - 가능한 경우 객체나 배열의 마지막 요소 뒤에 쉼표를 추가합니다. `"es5"`는 ECMAScript 5에서 지원하는 형태로, 배열, 객체, 함수 인자 등에 쉼표를 추가합니다. `"all"`로 설정하면 함수 인자 끝에도 쉼표를 추가합니다.

- **`bracketSpacing`: true**
    - 객체 리터럴에서 중괄호 양쪽에 공백을 추가합니다. `{ foo: bar }`와 같은 형태로, 코드 가독성을 높이는 데 도움을 줍니다.

- **`jsxBracketSameLine`: false**
    - JSX의 마지막 `>`를 다음 줄로 내립니다. `<Component prop="value" />`와 같이 닫는 태그를 다음 줄로 내려서, 태그 구조가 더 명확하게 보이도록 합니다.

- **`arrowParens`: "always"**
    - 화살표 함수의 매개변수에 항상 괄호를 사용합니다. 매개변수가 하나일 때도 괄호를 사용하여 일관성을 유지합니다. 예: `(param) => { ... }`.

- **`endOfLine`: "lf"**
    - 줄바꿈을 `LF`로 설정합니다. Unix 스타일을 사용하여 Linux, macOS 환경에서 문제 없이 작동하도록 합니다.

### 추가 설정 팁
- **`proseWrap`**: `"always"`로 설정하면 마크다운 파일에서 텍스트가 긴 경우 자동으로 줄 바꿈을 추가합니다.
- **`htmlWhitespaceSensitivity`**: `"css"`로 설정하면 HTML에서 CSS의 `white-space` 규칙에 따라 줄 바꿈이 결정됩니다.

이 설정들은 코드 스타일을 일관성 있게 유지해 주며, 협업 시 코드 리뷰를 간소화하고 코드의 가독성을 높이는 데 도움이 됩니다. 팀원들과 설정을 공유하고, 프로젝트에 맞는 최적의 스타일을 선택해 설정하는 것이 중요합니다.


