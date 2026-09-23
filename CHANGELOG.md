# Changelog

## [2.1.0](https://github.com/MaksymStoianov/apps-script-utils/compare/apps-script-utils-v2.0.0...apps-script-utils-v2.1.0) (2026-09-23)


### Features

* **docs:** link the translations under the breadcrumbs, and say once at the end that AI wrote this ([f880ce8](https://github.com/MaksymStoianov/apps-script-utils/commit/f880ce8d80822a7913a1354fe7e1b2e226a6c3cf)), closes [#539](https://github.com/MaksymStoianov/apps-script-utils/issues/539)
* **docs:** link the translations under the breadcrumbs, and the AI notice before the footer ([e89a2e8](https://github.com/MaksymStoianov/apps-script-utils/commit/e89a2e8790882961fceab00cdeeffa9d41373ead))
* **docs:** link the translations under the breadcrumbs, and the AI notice before the footer ([2450cf7](https://github.com/MaksymStoianov/apps-script-utils/commit/2450cf7aa3e9f371f59edae7dffce7251b599533))


### Bug Fixes

* **docs:** declare the build settings per instance, and check they land ([f338835](https://github.com/MaksymStoianov/apps-script-utils/commit/f338835b8db2e5e121caebc076eced90bc86c2b9))
* **docs:** declare the build settings per instance, and check they land ([7407642](https://github.com/MaksymStoianov/apps-script-utils/commit/7407642b6b95424a96be57e1eef13655c5dc7bc1)), closes [#539](https://github.com/MaksymStoianov/apps-script-utils/issues/539)
* **docs:** keep the injections — the build profile really is inert ([d646f6b](https://github.com/MaksymStoianov/apps-script-utils/commit/d646f6b138d62cc755dac23bdd414b2798ab3a98)), closes [#539](https://github.com/MaksymStoianov/apps-script-utils/issues/539)
* **docs:** mount the header controls reliably, and put the notice in the article ([ab18695](https://github.com/MaksymStoianov/apps-script-utils/commit/ab1869569f042f188c95117df8a703b49cd9964f)), closes [#539](https://github.com/MaksymStoianov/apps-script-utils/issues/539)
* **docs:** put the build profile at the solution root ([6cd294a](https://github.com/MaksymStoianov/apps-script-utils/commit/6cd294a77581f8d7eefe59c102fa00acfbe8f71c)), closes [#539](https://github.com/MaksymStoianov/apps-script-utils/issues/539)
* **docs:** put the language and search controls in the header ([354a443](https://github.com/MaksymStoianov/apps-script-utils/commit/354a4436bf0cd6b8fecec452492989f78ee782aa))
* **docs:** put the language and search controls in the header ([6c69ee6](https://github.com/MaksymStoianov/apps-script-utils/commit/6c69ee6abfa0238ff4e265a13470dd0510a6e184))
* **docs:** put the language and search controls in the header ([d578dc9](https://github.com/MaksymStoianov/apps-script-utils/commit/d578dc95cd7e308d0ebd151263361438dc0eaf69)), closes [#539](https://github.com/MaksymStoianov/apps-script-utils/issues/539)
* **docs:** write the head, the switcher and the notice in after the build ([d281d6f](https://github.com/MaksymStoianov/apps-script-utils/commit/d281d6f14552c357b77824069f839bc8320c1941))
* **docs:** write the head, the switcher and the notice in after the build ([85b127e](https://github.com/MaksymStoianov/apps-script-utils/commit/85b127e65654f9472d0142bc92e0fce7cefd063c)), closes [#539](https://github.com/MaksymStoianov/apps-script-utils/issues/539)

## [2.0.0](https://github.com/MaksymStoianov/apps-script-utils/compare/apps-script-utils-v1.10.0...apps-script-utils-v2.0.0) (2026-09-23)


### ⚠ BREAKING CHANGES

* **slide:** getSlideIndex takes (slide, presentation?) rather than (presentation, slide). A call left in the other order returns null.
* **slide:** getSlideByIndex takes (index, presentation?) rather than (presentation, index). A call left in the old order returns null.
* **sheet:** a failed write throws the Error the Apps Script service raised rather than a string carrying its message. A caller matching on a string value has to match on `error.message` instead.
* **sheet:** updateFormulas no longer rejects a Range as its first argument; a call that relied on a Range throwing InvalidSheetException now rewrites it.
* **sheet:** getValues no longer rejects a Range as its first argument; a call that relied on a Range throwing InvalidSheetException now reads it.
* **sheet:** deleteColumnsByConditional no longer rejects a Range as its first argument; a call that relied on a Range throwing InvalidSheetException now runs.
* **sheet:** deleteRowsByConditional no longer rejects a Range as its first argument; a call that relied on a Range throwing InvalidSheetException now runs.
* **sheet:** clearColumnsByConditional no longer rejects a Range as its first argument; a call that relied on a Range throwing InvalidSheetException now runs.
* **sheet:** clearRowsByConditional no longer rejects a Range as its first argument; a call that relied on a Range throwing InvalidSheetException now runs.
* **sheet:** prependRow no longer rejects a Range as its first argument; a call that relied on a Range throwing InvalidSheetException now inserts.
* **sheet:** prependRows no longer rejects a Range as its first argument; a call that relied on a Range throwing InvalidSheetException now inserts.
* **sheet:** prependColumn no longer rejects a Range as its first argument; a call that relied on a Range throwing InvalidSheetException now inserts.
* **sheet:** prependColumns no longer rejects a Range as its first argument; a call that relied on a Range throwing InvalidSheetException now inserts.
* **sheet:** appendColumn writes its values down one column instead of across one row, and rejects anything that is not a flat array.
* **sheet:** appendRow no longer rejects a Range as its first argument; a call that relied on a Range throwing InvalidSheetException now writes.
* **sheet:** appendRows no longer rejects a Range as its first argument; a call that relied on a Range throwing InvalidSheetException now writes.
* **slide:** getSlideIndex now takes (presentation, slide) rather than (slide, presentation). A call left in the old order returns null instead of an index.
* **slide:** convertMarkdownToRichText no longer returns an empty array for `null`, `undefined`, a missing argument or a value of another type; it throws.
* **sheet:** appendColumns, and appendColumn with it, write one column further right than before — the column they used to overwrite is now left alone.
* **sheet:** isValidSheetName now rejects names containing \ / ? * [ ], names longer than 100 characters, and the reserved name History.
* **sheet:** isValidSpreadsheetId no longer accepts arbitrary strings longer than ten characters, including Sheets URLs.
* **sheet:** isValidSheetId no longer accepts fractions, Infinity, or values beyond Number.MAX_SAFE_INTEGER.
* **sheet:** parseA1Notations("") returns [] instead of throwing EmptyStringException.

### Features

* **admin:** add nonAdmin guard ([504f31c](https://github.com/MaksymStoianov/apps-script-utils/commit/504f31c5beede81d7a7b43ffa5e6d4413cd3806f))
* **admin:** add nonAdmin guard ([bd8f964](https://github.com/MaksymStoianov/apps-script-utils/commit/bd8f9641291db8e328c36cde424aa769d2f53854)), closes [#327](https://github.com/MaksymStoianov/apps-script-utils/issues/327)
* **admin:** add requireAdmin ([ecf782a](https://github.com/MaksymStoianov/apps-script-utils/commit/ecf782af6fa3e94de99d3b7be04a355c5b61f0e0))
* **admin:** add requireAdmin ([821d792](https://github.com/MaksymStoianov/apps-script-utils/commit/821d79227a53f27eaa094776413d745e2eb5c47c)), closes [#328](https://github.com/MaksymStoianov/apps-script-utils/issues/328)
* **appsscript:** add clearColumnsByConditional ([a4d21ba](https://github.com/MaksymStoianov/apps-script-utils/commit/a4d21ba9de3f95399b8d9f5945209ebb3b93f6b4)), closes [#287](https://github.com/MaksymStoianov/apps-script-utils/issues/287)
* **appsscript:** add clearRowsByConditional ([8d6f91b](https://github.com/MaksymStoianov/apps-script-utils/commit/8d6f91b07f44f1a65c6b957629e4adce196cbbb3)), closes [#288](https://github.com/MaksymStoianov/apps-script-utils/issues/288)
* **appsscript:** add createFolder ([25b012a](https://github.com/MaksymStoianov/apps-script-utils/commit/25b012a683dcce55a7a8f97a417cb8ba5b6d4f0f)), closes [#293](https://github.com/MaksymStoianov/apps-script-utils/issues/293)
* **appsscript:** add deleteColumnsByConditional ([6a742b6](https://github.com/MaksymStoianov/apps-script-utils/commit/6a742b63821706a85b8292850c96eeb9e3184a22)), closes [#290](https://github.com/MaksymStoianov/apps-script-utils/issues/290)
* **appsscript:** add deleteRowsByConditional ([1198eb6](https://github.com/MaksymStoianov/apps-script-utils/commit/1198eb6a07134632d50888831b830df0fe407b14)), closes [#289](https://github.com/MaksymStoianov/apps-script-utils/issues/289)
* **appsscript:** add getNamedRangeByName ([3103229](https://github.com/MaksymStoianov/apps-script-utils/commit/3103229c88916146ee113f31b1c50361dd396949)), closes [#292](https://github.com/MaksymStoianov/apps-script-utils/issues/292)
* **appsscript:** add getSchema ([b9af02e](https://github.com/MaksymStoianov/apps-script-utils/commit/b9af02e1d6a85f74464692d4e745bb6b166ee6d7)), closes [#284](https://github.com/MaksymStoianov/apps-script-utils/issues/284)
* **appsscript:** add getTriggerById ([57464d8](https://github.com/MaksymStoianov/apps-script-utils/commit/57464d89fbd1790010c2e3997216ff634293ebad)), closes [#294](https://github.com/MaksymStoianov/apps-script-utils/issues/294)
* **appsscript:** add getValues ([061faa2](https://github.com/MaksymStoianov/apps-script-utils/commit/061faa22fb4ba346842ca33763488cd25f6ceb2d)), closes [#286](https://github.com/MaksymStoianov/apps-script-utils/issues/286)
* **appsscript:** add insertSchema ([3cf9172](https://github.com/MaksymStoianov/apps-script-utils/commit/3cf9172a65479f3a43ae2ea41f2c7f77329002c8)), closes [#283](https://github.com/MaksymStoianov/apps-script-utils/issues/283)
* **appsscript:** add prependColumn ([3a23029](https://github.com/MaksymStoianov/apps-script-utils/commit/3a23029635f44c046e5fcd701f52bb8af679cfab)), closes [#260](https://github.com/MaksymStoianov/apps-script-utils/issues/260)
* **appsscript:** add prependColumns ([69d9663](https://github.com/MaksymStoianov/apps-script-utils/commit/69d9663c23dd30692f9e5224aa14ac8fbd03a1e1)), closes [#261](https://github.com/MaksymStoianov/apps-script-utils/issues/261)
* **appsscript:** add removeSchema ([59b1dd2](https://github.com/MaksymStoianov/apps-script-utils/commit/59b1dd2b8c4616065672a9b3820e982afe04eede)), closes [#285](https://github.com/MaksymStoianov/apps-script-utils/issues/285)
* **appsscript:** add updateFormulas ([1cd1d9c](https://github.com/MaksymStoianov/apps-script-utils/commit/1cd1d9c8d3b0f004244e627e326926bceb1d3da9)), closes [#291](https://github.com/MaksymStoianov/apps-script-utils/issues/291)
* **exception:** add AuthorizationException ([b1164bf](https://github.com/MaksymStoianov/apps-script-utils/commit/b1164bf05277339ca918006d4cf46494ffe9f04f))
* **exception:** add AuthorizationException ([f55d3db](https://github.com/MaksymStoianov/apps-script-utils/commit/f55d3dbdd34dee487ec630c33986e8d6d12e98a9)), closes [#402](https://github.com/MaksymStoianov/apps-script-utils/issues/402)
* **exception:** add IllegalStateException ([a98953e](https://github.com/MaksymStoianov/apps-script-utils/commit/a98953e3a4794bd0fdc36f9530d6569756203069)), closes [#458](https://github.com/MaksymStoianov/apps-script-utils/issues/458)
* **lang:** add compact ([628a037](https://github.com/MaksymStoianov/apps-script-utils/commit/628a037d41e2e1659277527f4299456008c9e09f)), closes [#273](https://github.com/MaksymStoianov/apps-script-utils/issues/273)
* **lang:** add equals ([2c49084](https://github.com/MaksymStoianov/apps-script-utils/commit/2c490842eb6d4517d77d66d80dd432b6844942d5))
* **lang:** add equals ([a126386](https://github.com/MaksymStoianov/apps-script-utils/commit/a126386d772d916eb32311ea8d61494f0100a688)), closes [#457](https://github.com/MaksymStoianov/apps-script-utils/issues/457)
* **lang:** add first ([3a5c4c4](https://github.com/MaksymStoianov/apps-script-utils/commit/3a5c4c4cb5171a361b4bb3945e7c404f75022cf8)), closes [#271](https://github.com/MaksymStoianov/apps-script-utils/issues/271)
* **lang:** add flat ([cdc1692](https://github.com/MaksymStoianov/apps-script-utils/commit/cdc1692df7e4c08fb73a65a83e8ffbe7ce541f5a)), closes [#480](https://github.com/MaksymStoianov/apps-script-utils/issues/480)
* **lang:** add getPath ([e48ab1c](https://github.com/MaksymStoianov/apps-script-utils/commit/e48ab1c246221f108e3325901d8f9f391b222b06)), closes [#478](https://github.com/MaksymStoianov/apps-script-utils/issues/478)
* **lang:** add intersect ([e143c37](https://github.com/MaksymStoianov/apps-script-utils/commit/e143c37723cac658fd375695b9a6af4ed35b780a)), closes [#275](https://github.com/MaksymStoianov/apps-script-utils/issues/275)
* **lang:** add isDouble ([d61ff27](https://github.com/MaksymStoianov/apps-script-utils/commit/d61ff272f4e1eab21cb42740d1028af367be2f74)), closes [#474](https://github.com/MaksymStoianov/apps-script-utils/issues/474)
* **lang:** add isFloat guard ([8399e41](https://github.com/MaksymStoianov/apps-script-utils/commit/8399e4105094c5b4dd569e455b011272523c55a5))
* **lang:** add isNaN guard ([8dea6bf](https://github.com/MaksymStoianov/apps-script-utils/commit/8dea6bf6dbcf7ad54fab6793fb87385e67f4c8c8))
* **lang:** add isSafeInteger guard ([7ea4f95](https://github.com/MaksymStoianov/apps-script-utils/commit/7ea4f95c47c934e8d45a926158c8fe6ee3dcbd30))
* **lang:** add last ([b802f1d](https://github.com/MaksymStoianov/apps-script-utils/commit/b802f1dbdb5b23e40915dc5ec932e85f3a4b754a)), closes [#272](https://github.com/MaksymStoianov/apps-script-utils/issues/272)
* **lang:** add merge ([1ab332b](https://github.com/MaksymStoianov/apps-script-utils/commit/1ab332b42d946918f6508a7a599bed7ff9e3e14f)), closes [#276](https://github.com/MaksymStoianov/apps-script-utils/issues/276)
* **lang:** add non2DArray guard ([90625e6](https://github.com/MaksymStoianov/apps-script-utils/commit/90625e66850fbb65b06b915b9476d8e72dd929f4))
* **lang:** add non2DArray guard ([e1a3bf3](https://github.com/MaksymStoianov/apps-script-utils/commit/e1a3bf3d17a3e4bbf435a3d9486a1dde3b49848c)), closes [#306](https://github.com/MaksymStoianov/apps-script-utils/issues/306)
* **lang:** add nonConsistent2DArray guard ([269f271](https://github.com/MaksymStoianov/apps-script-utils/commit/269f271db07c8b37e1a8b91ae5d344233b8df91d))
* **lang:** add nonConsistent2DArray guard ([648adab](https://github.com/MaksymStoianov/apps-script-utils/commit/648adab9f5c46f88ca8b0d799fa65826a98ac944)), closes [#307](https://github.com/MaksymStoianov/apps-script-utils/issues/307)
* **lang:** add nonCountable guard ([8953b21](https://github.com/MaksymStoianov/apps-script-utils/commit/8953b21593cfef61f61329897884b61733b72db0))
* **lang:** add nonDouble ([fe0cc89](https://github.com/MaksymStoianov/apps-script-utils/commit/fe0cc8942041092b48c8766848f4158ec22666e0)), closes [#475](https://github.com/MaksymStoianov/apps-script-utils/issues/475)
* **lang:** add nonException guard ([fadcaf6](https://github.com/MaksymStoianov/apps-script-utils/commit/fadcaf6ad375237a792ed8ebb58139654ed512d2))
* **lang:** add nonFloat ([1887c1e](https://github.com/MaksymStoianov/apps-script-utils/commit/1887c1e741ae159cd785a1a75831894309fa1922)), closes [#246](https://github.com/MaksymStoianov/apps-script-utils/issues/246)
* **lang:** add nonFunctionLike guard ([8367e61](https://github.com/MaksymStoianov/apps-script-utils/commit/8367e618bbee3449594c6a22956ed3c6e3fbe151))
* **lang:** add nonInteger guard ([d0e5a3e](https://github.com/MaksymStoianov/apps-script-utils/commit/d0e5a3e70c47cf9d02b5f15cefe7976d2ddba602))
* **lang:** add nonLength guard ([9b50ade](https://github.com/MaksymStoianov/apps-script-utils/commit/9b50adedf159ed7a64d27b7e3bcebcd5ab9019ea))
* **lang:** add nonNaN ([e369399](https://github.com/MaksymStoianov/apps-script-utils/commit/e369399fa223d014bba388632dea0876a9b7227f)), closes [#248](https://github.com/MaksymStoianov/apps-script-utils/issues/248)
* **lang:** add nonNumberLike guard ([dbd25b4](https://github.com/MaksymStoianov/apps-script-utils/commit/dbd25b495584bb80daa1cf6a13f4075dbee36515))
* **lang:** add nonObject guard ([61f2bcb](https://github.com/MaksymStoianov/apps-script-utils/commit/61f2bcb5b977c77b672c881ebf99ef070f351f3a))
* **lang:** add nonObjectLike guard ([9707e8b](https://github.com/MaksymStoianov/apps-script-utils/commit/9707e8b5c593e6544ec0f33095964fdbe27b6a69))
* **lang:** add nonRegExp guard ([5ca8005](https://github.com/MaksymStoianov/apps-script-utils/commit/5ca800506c593de136ffe43f4b1d18a15d18745d))
* **lang:** add nonSafeInteger ([147b899](https://github.com/MaksymStoianov/apps-script-utils/commit/147b899728c1c2ca22b3a1cd4636714cf63c0f9b)), closes [#247](https://github.com/MaksymStoianov/apps-script-utils/issues/247)
* **lang:** add nonValidEmail guard ([4dac3c4](https://github.com/MaksymStoianov/apps-script-utils/commit/4dac3c4e0bce4bd5ff174f6eabbecab0e628dd35))
* **lang:** add nonValidLocale guard ([bf1dcba](https://github.com/MaksymStoianov/apps-script-utils/commit/bf1dcba32d97cea3fa81e18aa1c4369b33344b0b))
* **lang:** add nonValidSlug guard ([b410d9f](https://github.com/MaksymStoianov/apps-script-utils/commit/b410d9fe954aeb625bac0e37ff19eb22fc7374c5))
* **lang:** add nonValidVersion guard ([753caa2](https://github.com/MaksymStoianov/apps-script-utils/commit/753caa21507d324219e11aa3f87081d3b3443d08))
* **lang:** add nonVersionCompatible guard ([4e63678](https://github.com/MaksymStoianov/apps-script-utils/commit/4e6367899efea90dd8e66ecd59a1ed137011cd28))
* **lang:** add require2DArray ([54b6321](https://github.com/MaksymStoianov/apps-script-utils/commit/54b6321dc93c9b13e2499f33bd4d18875c8e929b))
* **lang:** add require2DArray ([a8f2e54](https://github.com/MaksymStoianov/apps-script-utils/commit/a8f2e54d4f527caea182f969b0a615332ba9df8e)), closes [#308](https://github.com/MaksymStoianov/apps-script-utils/issues/308)
* **lang:** add requireArray ([1b2ead2](https://github.com/MaksymStoianov/apps-script-utils/commit/1b2ead2dff174ce9d155403ba69be742d1328f51))
* **lang:** add requireBoolean ([6968e0b](https://github.com/MaksymStoianov/apps-script-utils/commit/6968e0b946e79ccef58a9abc795df411bc0d3a02))
* **lang:** add requireConsistent2DArray ([46a912a](https://github.com/MaksymStoianov/apps-script-utils/commit/46a912a7447a6564dad44a6d1dbb18f69b51298c))
* **lang:** add requireConsistent2DArray ([eff7450](https://github.com/MaksymStoianov/apps-script-utils/commit/eff74509e73b5c5bede66f2c5f2b841e2e396419)), closes [#309](https://github.com/MaksymStoianov/apps-script-utils/issues/309)
* **lang:** add requireCountable ([e5148f2](https://github.com/MaksymStoianov/apps-script-utils/commit/e5148f28a9732937e944358c112fbc64d07a5f2b))
* **lang:** add requireDouble ([6209dab](https://github.com/MaksymStoianov/apps-script-utils/commit/6209dab0b1dada4a30e9292c9ef5ba95ab2ee02b)), closes [#476](https://github.com/MaksymStoianov/apps-script-utils/issues/476)
* **lang:** add requireEmpty ([ef7c702](https://github.com/MaksymStoianov/apps-script-utils/commit/ef7c702a8e6d9228728cdb3ba8c9fa8199f2ef07))
* **lang:** add requireException ([0551ad6](https://github.com/MaksymStoianov/apps-script-utils/commit/0551ad6f5e1df2ca76eaa6e1849e70bc9b6c68a3))
* **lang:** add requireFloat ([4c789ca](https://github.com/MaksymStoianov/apps-script-utils/commit/4c789cafb49ffababc9291fd5ec50ba3ee690bf2)), closes [#249](https://github.com/MaksymStoianov/apps-script-utils/issues/249)
* **lang:** add requireFunction ([bfb71de](https://github.com/MaksymStoianov/apps-script-utils/commit/bfb71de64c3c1118e1fa7bd0be9c71abfd8f7026))
* **lang:** add requireFunctionLike ([b8adca2](https://github.com/MaksymStoianov/apps-script-utils/commit/b8adca280d2daa59d30ad34406d8529fa74f36d1))
* **lang:** add requireInteger ([93cb5e0](https://github.com/MaksymStoianov/apps-script-utils/commit/93cb5e0a256cb70d0a167dc64ff2543625ed5e10))
* **lang:** add requireLength ([02f2cb7](https://github.com/MaksymStoianov/apps-script-utils/commit/02f2cb7157e6b9e1a0046939453b23607ee30d74))
* **lang:** add requireNaN ([3316adc](https://github.com/MaksymStoianov/apps-script-utils/commit/3316adc843005d481df5bb3c6ef15ede98a155be)), closes [#251](https://github.com/MaksymStoianov/apps-script-utils/issues/251)
* **lang:** add requireNil ([5188ee3](https://github.com/MaksymStoianov/apps-script-utils/commit/5188ee3ca61c36430c4a47e2130a7061f272b4ea))
* **lang:** add requireNonArray ([4bbc435](https://github.com/MaksymStoianov/apps-script-utils/commit/4bbc435264245577b29c70ab8deaf9e8e6c2f1c9))
* **lang:** add requireNonBoolean ([6f2a6d5](https://github.com/MaksymStoianov/apps-script-utils/commit/6f2a6d518393713476a29acf524f42fcad76a17e))
* **lang:** add requireNonDouble ([e8b5c09](https://github.com/MaksymStoianov/apps-script-utils/commit/e8b5c093d439251e82e308ef07da4a273da5de3f)), closes [#477](https://github.com/MaksymStoianov/apps-script-utils/issues/477)
* **lang:** add requireNonEmpty ([dab5e75](https://github.com/MaksymStoianov/apps-script-utils/commit/dab5e754d86193884f716c0d3b6eac3c1a083006))
* **lang:** add requireNonException ([0187f32](https://github.com/MaksymStoianov/apps-script-utils/commit/0187f32f6f520fca4bd74429f021adc81942c4a7))
* **lang:** add requireNonFloat ([b8711ed](https://github.com/MaksymStoianov/apps-script-utils/commit/b8711edf5daf8c49f3b5f3b71f487127920cb79f)), closes [#252](https://github.com/MaksymStoianov/apps-script-utils/issues/252)
* **lang:** add requireNonFunction ([f53e1eb](https://github.com/MaksymStoianov/apps-script-utils/commit/f53e1ebce8ee58a72fdbcfca53447ffc11f1fb6d))
* **lang:** add requireNonFunctionLike ([31373ab](https://github.com/MaksymStoianov/apps-script-utils/commit/31373ab45d9f7d0b5739a9835c70895586cba61f))
* **lang:** add requireNoNilElements ([2da2885](https://github.com/MaksymStoianov/apps-script-utils/commit/2da2885185c9383cc2a9cd1a14e3c311a13747eb))
* **lang:** add requireNoNilElements ([a73a4da](https://github.com/MaksymStoianov/apps-script-utils/commit/a73a4da65a6db1be78ee08c0753fd272c8650145)), closes [#460](https://github.com/MaksymStoianov/apps-script-utils/issues/460)
* **lang:** add requireNonInteger ([b5b137d](https://github.com/MaksymStoianov/apps-script-utils/commit/b5b137dc12ddab4d99d9cd3677a0fc1a218f3d2e)), closes [#253](https://github.com/MaksymStoianov/apps-script-utils/issues/253)
* **lang:** add requireNonLength ([4f14142](https://github.com/MaksymStoianov/apps-script-utils/commit/4f14142056691d3045bb652e4c323dae0bf58e82))
* **lang:** add requireNonNaN ([b54bd84](https://github.com/MaksymStoianov/apps-script-utils/commit/b54bd84aafc267ad7d2488d3ae51a5e6958b934a)), closes [#255](https://github.com/MaksymStoianov/apps-script-utils/issues/255)
* **lang:** add requireNonNil ([80875bf](https://github.com/MaksymStoianov/apps-script-utils/commit/80875bf3c61ab7190adadffc2738d59b5ca39453))
* **lang:** add requireNonNumber ([110fcb6](https://github.com/MaksymStoianov/apps-script-utils/commit/110fcb67cdc7ce65f7622b02c68b8c6ff56e7c43))
* **lang:** add requireNonNumberLike ([5ff6aa8](https://github.com/MaksymStoianov/apps-script-utils/commit/5ff6aa8171e4a123f95726a0b5168ada400ec939))
* **lang:** add requireNonObject ([035e775](https://github.com/MaksymStoianov/apps-script-utils/commit/035e775540802f762c3be9f4617c440677880151))
* **lang:** add requireNonObjectLike ([65035df](https://github.com/MaksymStoianov/apps-script-utils/commit/65035df8c77572ef0488273df67c68705c799d43))
* **lang:** add requireNonRegExp ([2490df2](https://github.com/MaksymStoianov/apps-script-utils/commit/2490df2e89513f6dbf4b20dbcc966f94e2f8e99d))
* **lang:** add requireNonSafeInteger ([10c6e32](https://github.com/MaksymStoianov/apps-script-utils/commit/10c6e32cf070333ae26dad6a1c88b09f2928c017)), closes [#254](https://github.com/MaksymStoianov/apps-script-utils/issues/254)
* **lang:** add requireNonScalar ([c8b5ab5](https://github.com/MaksymStoianov/apps-script-utils/commit/c8b5ab522ec56cada2915b4ac96dee3a5b97e537))
* **lang:** add requireNonString ([7c87aff](https://github.com/MaksymStoianov/apps-script-utils/commit/7c87aff79318978f436f23c0aa73d24743febc24))
* **lang:** add requireNonSymbol ([7b8465a](https://github.com/MaksymStoianov/apps-script-utils/commit/7b8465a1e70c866036d293af0878d876c8766d7d))
* **lang:** add requireNonUndefined ([ab94f12](https://github.com/MaksymStoianov/apps-script-utils/commit/ab94f12293dd138d8ba779e851781e51727d3858))
* **lang:** add requireNull ([17b62fb](https://github.com/MaksymStoianov/apps-script-utils/commit/17b62fb0ced603fa0417992a42512738af389b3f))
* **lang:** add requireNumber ([499f081](https://github.com/MaksymStoianov/apps-script-utils/commit/499f08137bb6b1d60f01eb4dd2c49b9eedad89c4))
* **lang:** add requireNumberLike ([0110ebb](https://github.com/MaksymStoianov/apps-script-utils/commit/0110ebb9578b908f35f070b5fd5603f7b05ee980))
* **lang:** add requireObject ([6262047](https://github.com/MaksymStoianov/apps-script-utils/commit/62620476199b9b2969cbe5fbedf15b963938e3fd))
* **lang:** add requireObjectLike ([cebc85f](https://github.com/MaksymStoianov/apps-script-utils/commit/cebc85f8e71d07d5d7b0c5c460b9d53bf835cb9b))
* **lang:** add requireRegExp ([5265a92](https://github.com/MaksymStoianov/apps-script-utils/commit/5265a924a0439aa7723edf7008319786570b643a))
* **lang:** add requireSafeInteger ([6b91bde](https://github.com/MaksymStoianov/apps-script-utils/commit/6b91bdec638052a5a56898c855edb9f2ac791fa7)), closes [#250](https://github.com/MaksymStoianov/apps-script-utils/issues/250)
* **lang:** add requireScalar ([b5af450](https://github.com/MaksymStoianov/apps-script-utils/commit/b5af4509826e10f603ef82b4b8dc039ea278c5cc))
* **lang:** add requireState ([60484af](https://github.com/MaksymStoianov/apps-script-utils/commit/60484aff5baa8f7a72a86f677cc9267529701e61))
* **lang:** add requireState ([719c1f4](https://github.com/MaksymStoianov/apps-script-utils/commit/719c1f4f69cc7aaf3f488e2c63aeb856648f7fc4)), closes [#459](https://github.com/MaksymStoianov/apps-script-utils/issues/459)
* **lang:** add requireSymbol ([91d4039](https://github.com/MaksymStoianov/apps-script-utils/commit/91d403982901abcc4f8bad8bfe3d42afe8bcfee5))
* **lang:** add requireUndefined ([bcb2a93](https://github.com/MaksymStoianov/apps-script-utils/commit/bcb2a93eb83c345edf8cd34b64ccba3ff162b5a3))
* **lang:** add requireValidLocale ([9588d7f](https://github.com/MaksymStoianov/apps-script-utils/commit/9588d7f973748ccffdd0c834c1b65973d4e4fc6b))
* **lang:** add requireValidLocale ([d10a87f](https://github.com/MaksymStoianov/apps-script-utils/commit/d10a87f51253c6a8ed60b93569dde8f31a6e2a2c)), closes [#302](https://github.com/MaksymStoianov/apps-script-utils/issues/302)
* **lang:** add requireValidSlug ([7339e2f](https://github.com/MaksymStoianov/apps-script-utils/commit/7339e2f7d7525bcbac8f2e3291bbee5a8bdcf4a2))
* **lang:** add requireValidSlug ([413d7a0](https://github.com/MaksymStoianov/apps-script-utils/commit/413d7a0ad4f756a6544307e7ec98d16e4dd22a42)), closes [#303](https://github.com/MaksymStoianov/apps-script-utils/issues/303)
* **lang:** add requireValidVersion ([d6452f5](https://github.com/MaksymStoianov/apps-script-utils/commit/d6452f5fed2d6be788626067d763e07afb4104da))
* **lang:** add requireValidVersion ([5248aab](https://github.com/MaksymStoianov/apps-script-utils/commit/5248aabef0823bab78a658fc4ed0a1980c753797)), closes [#304](https://github.com/MaksymStoianov/apps-script-utils/issues/304)
* **lang:** add requireVersionCompatible ([7d681a3](https://github.com/MaksymStoianov/apps-script-utils/commit/7d681a3490af1690f5e9cf7785cef07ca61250cc))
* **lang:** add requireVersionCompatible ([a0e1b70](https://github.com/MaksymStoianov/apps-script-utils/commit/a0e1b70a62bd27f39226543815ea4248b32824be)), closes [#305](https://github.com/MaksymStoianov/apps-script-utils/issues/305)
* **lang:** add retry ([1d4f413](https://github.com/MaksymStoianov/apps-script-utils/commit/1d4f4132c3aacf533ed4667c90c741f8782f9746))
* **lang:** add retry ([489d724](https://github.com/MaksymStoianov/apps-script-utils/commit/489d724162adb2a9b3982728f9de03732bfdfba3)), closes [#461](https://github.com/MaksymStoianov/apps-script-utils/issues/461)
* **lang:** add setPath ([6b7c96e](https://github.com/MaksymStoianov/apps-script-utils/commit/6b7c96e647685a7586cf8dd40ed086ceed0b9426)), closes [#479](https://github.com/MaksymStoianov/apps-script-utils/issues/479)
* **lang:** add unique ([c6c2eaa](https://github.com/MaksymStoianov/apps-script-utils/commit/c6c2eaa0252c1558532af04f1718958b8b39d4d0)), closes [#270](https://github.com/MaksymStoianov/apps-script-utils/issues/270)
* **lang:** add without ([68bbbb2](https://github.com/MaksymStoianov/apps-script-utils/commit/68bbbb213ff5f4bdb2668b6c1124d318374f6534)), closes [#274](https://github.com/MaksymStoianov/apps-script-utils/issues/274)
* **net:** add nonAbsolute guard ([525a97d](https://github.com/MaksymStoianov/apps-script-utils/commit/525a97df562c32ce75745417d6a3c95f795d3e0d))
* **net:** add nonAbsolute guard ([1b40f11](https://github.com/MaksymStoianov/apps-script-utils/commit/1b40f112162545d413ae1f72ffb2f3624117f40c)), closes [#310](https://github.com/MaksymStoianov/apps-script-utils/issues/310)
* **net:** add nonRelative guard ([517af79](https://github.com/MaksymStoianov/apps-script-utils/commit/517af79500d18ccc644a80a5b62999d43ed775f7))
* **net:** add nonRelative guard ([965db67](https://github.com/MaksymStoianov/apps-script-utils/commit/965db67909c32ac99fd22bc5b7bae07ec6ddd6f9)), closes [#312](https://github.com/MaksymStoianov/apps-script-utils/issues/312)
* **net:** add nonUrl ([58e990b](https://github.com/MaksymStoianov/apps-script-utils/commit/58e990b1deb5f447baeccaa0f9a0ad67ada410d0)), closes [#317](https://github.com/MaksymStoianov/apps-script-utils/issues/317)
* **net:** add nonValidDomain guard ([4bedac1](https://github.com/MaksymStoianov/apps-script-utils/commit/4bedac1f9da5e7d1c5b5f72171bf9d3252514684))
* **net:** add nonValidDomain guard ([f64221a](https://github.com/MaksymStoianov/apps-script-utils/commit/f64221aa6a72592acd1faf8de5f796896c10b021)), closes [#314](https://github.com/MaksymStoianov/apps-script-utils/issues/314)
* **net:** add requireAbsolute ([f17c925](https://github.com/MaksymStoianov/apps-script-utils/commit/f17c92555d7543974b04f3cd4faa0b44c444b270))
* **net:** add requireAbsolute ([5aaca07](https://github.com/MaksymStoianov/apps-script-utils/commit/5aaca0734f76f43f62e73a4ae5c07dc08289f676)), closes [#311](https://github.com/MaksymStoianov/apps-script-utils/issues/311)
* **net:** add requireRelative ([fc03bc5](https://github.com/MaksymStoianov/apps-script-utils/commit/fc03bc5a91ba25c59e8d6ead824f38bae4b161a2))
* **net:** add requireRelative ([7e7a3d1](https://github.com/MaksymStoianov/apps-script-utils/commit/7e7a3d1db72fff23a86ca8a6e0e6ff104db95c88)), closes [#313](https://github.com/MaksymStoianov/apps-script-utils/issues/313)
* **net:** add requireUrl ([b64a884](https://github.com/MaksymStoianov/apps-script-utils/commit/b64a8847f578cbae1b27431383923eeddbc8235d)), closes [#319](https://github.com/MaksymStoianov/apps-script-utils/issues/319)
* **net:** add requireValidDomain ([c69a80c](https://github.com/MaksymStoianov/apps-script-utils/commit/c69a80c8e8532933cf85fc3f6d807ad6ea6e7cdd))
* **net:** add requireValidDomain ([daaeb99](https://github.com/MaksymStoianov/apps-script-utils/commit/daaeb991240e32ba99485b512ab1b365da81ac84)), closes [#315](https://github.com/MaksymStoianov/apps-script-utils/issues/315)
* **sheet:** add nonCellGridRange guard ([cd15794](https://github.com/MaksymStoianov/apps-script-utils/commit/cd157944a561abfc6ea11fa49b081114ddd56dcf))
* **sheet:** add nonCellGridRange guard ([bfd699e](https://github.com/MaksymStoianov/apps-script-utils/commit/bfd699e6d5cdc631fba2db2f6f600d3e4054895e)), closes [#329](https://github.com/MaksymStoianov/apps-script-utils/issues/329)
* **sheet:** add nonGridRangeContainedIn guard ([45b8ced](https://github.com/MaksymStoianov/apps-script-utils/commit/45b8ced4aba3ad971602c58a5ac78272471dd468))
* **sheet:** add nonGridRangeContainedIn guard ([d9188c5](https://github.com/MaksymStoianov/apps-script-utils/commit/d9188c573318c84dc2896a52f469b844a15cb183)), closes [#331](https://github.com/MaksymStoianov/apps-script-utils/issues/331)
* **sheet:** add nonGridRangeSameDimensions guard ([49dbb0d](https://github.com/MaksymStoianov/apps-script-utils/commit/49dbb0d1eb01392bf2a9be3574707f3ace5f14df))
* **sheet:** add nonGridRangeSameDimensions guard ([3467d4f](https://github.com/MaksymStoianov/apps-script-utils/commit/3467d4f16428da07334c5d1e29c425ff446145eb)), closes [#333](https://github.com/MaksymStoianov/apps-script-utils/issues/333)
* **sheet:** add nonRichTextValue guard ([ad36d50](https://github.com/MaksymStoianov/apps-script-utils/commit/ad36d503652be1360205dde1768ac5f65b50e4b2))
* **sheet:** add nonRichTextValue guard ([e562639](https://github.com/MaksymStoianov/apps-script-utils/commit/e562639a8f8ca96be34a8c5246966a8d27680a33)), closes [#335](https://github.com/MaksymStoianov/apps-script-utils/issues/335)
* **sheet:** add nonSpreadsheet guard ([2ff8586](https://github.com/MaksymStoianov/apps-script-utils/commit/2ff8586da58ebde8dc68161e2f5a89d5761c5d64))
* **sheet:** add nonSpreadsheet guard ([3d70a8d](https://github.com/MaksymStoianov/apps-script-utils/commit/3d70a8d00242745a9f57da19c5706fdf17ddc372)), closes [#337](https://github.com/MaksymStoianov/apps-script-utils/issues/337)
* **sheet:** add nonTextStyle guard ([99af6b4](https://github.com/MaksymStoianov/apps-script-utils/commit/99af6b4ae28e729bdf15e3d773ea50adbed462a3))
* **sheet:** add nonTextStyle guard ([dce621e](https://github.com/MaksymStoianov/apps-script-utils/commit/dce621e2248248c33bcfb077dfa3945eb37ec196)), closes [#338](https://github.com/MaksymStoianov/apps-script-utils/issues/338)
* **sheet:** add nonValidSheetId guard ([36eded7](https://github.com/MaksymStoianov/apps-script-utils/commit/36eded7a69c0bb912f2ad1297d2bca56afcb1c4c))
* **sheet:** add nonValidSheetId guard ([bd7cc9b](https://github.com/MaksymStoianov/apps-script-utils/commit/bd7cc9be7ce9f76a4571acb0318cb14d9c67a8f8)), closes [#344](https://github.com/MaksymStoianov/apps-script-utils/issues/344)
* **sheet:** add nonValidSheetName guard ([c0c60e8](https://github.com/MaksymStoianov/apps-script-utils/commit/c0c60e8efe4ff44cf2cb580ee6dd146d7ebc4a7b))
* **sheet:** add nonValidSheetName guard ([d98aadb](https://github.com/MaksymStoianov/apps-script-utils/commit/d98aadbad33973e1619c31176e282b2ebd779527)), closes [#340](https://github.com/MaksymStoianov/apps-script-utils/issues/340)
* **sheet:** add nonValidSpreadsheetId guard ([27f060f](https://github.com/MaksymStoianov/apps-script-utils/commit/27f060f858d10ac2a39ad830a1f69b174e5d4667))
* **sheet:** add nonValidSpreadsheetId guard ([dcf90fd](https://github.com/MaksymStoianov/apps-script-utils/commit/dcf90fdebbee801cbec4c67b309cc19a9856a483)), closes [#342](https://github.com/MaksymStoianov/apps-script-utils/issues/342)
* **sheet:** add requireCellGridRange ([dfe7b2d](https://github.com/MaksymStoianov/apps-script-utils/commit/dfe7b2d6592fac7adf9edd33329dfc900d975b67))
* **sheet:** add requireCellGridRange ([c08604f](https://github.com/MaksymStoianov/apps-script-utils/commit/c08604f313ba1117700c4ce1602e2c890cecb89c)), closes [#330](https://github.com/MaksymStoianov/apps-script-utils/issues/330)
* **sheet:** add requireGridRangeContainedIn ([1a17cbe](https://github.com/MaksymStoianov/apps-script-utils/commit/1a17cbe63f091f3170ff176614c02106d5f94ed8))
* **sheet:** add requireGridRangeContainedIn ([ae75f89](https://github.com/MaksymStoianov/apps-script-utils/commit/ae75f89ef005501590d34c3e2a9bb5888ffefd39)), closes [#332](https://github.com/MaksymStoianov/apps-script-utils/issues/332)
* **sheet:** add requireGridRangeSameDimensions ([475b5a4](https://github.com/MaksymStoianov/apps-script-utils/commit/475b5a4e9259ac495bc245de81927b465bf246a9))
* **sheet:** add requireGridRangeSameDimensions ([a34d242](https://github.com/MaksymStoianov/apps-script-utils/commit/a34d24222c992dea725ac125d614923687c0c644)), closes [#334](https://github.com/MaksymStoianov/apps-script-utils/issues/334)
* **sheet:** add requireRichTextValue ([2d13cb5](https://github.com/MaksymStoianov/apps-script-utils/commit/2d13cb50914322d71ff5a6d488c94c5576593335))
* **sheet:** add requireRichTextValue ([e5b1d91](https://github.com/MaksymStoianov/apps-script-utils/commit/e5b1d919d193827395c89a019e1ea1c1ea7564a4)), closes [#336](https://github.com/MaksymStoianov/apps-script-utils/issues/336)
* **sheet:** add requireTextStyle ([4ba2c15](https://github.com/MaksymStoianov/apps-script-utils/commit/4ba2c1563319dbeab1fc09715fea5892387e796f))
* **sheet:** add requireTextStyle ([049df09](https://github.com/MaksymStoianov/apps-script-utils/commit/049df096de2e00c5ba2147a468ec49538f307638)), closes [#339](https://github.com/MaksymStoianov/apps-script-utils/issues/339)
* **sheet:** add requireValidSheetId ([dd23ecb](https://github.com/MaksymStoianov/apps-script-utils/commit/dd23ecb394d30ca48f574eda6cf20f367e050d5b))
* **sheet:** add requireValidSheetId ([cce1dee](https://github.com/MaksymStoianov/apps-script-utils/commit/cce1dee5a7c0a84dcd36c934506c53e350d00235)), closes [#345](https://github.com/MaksymStoianov/apps-script-utils/issues/345)
* **sheet:** add requireValidSheetName ([02a95f4](https://github.com/MaksymStoianov/apps-script-utils/commit/02a95f464ea56b4bf0f571fd84d8bba0904f681b))
* **sheet:** add requireValidSheetName ([6d4caa2](https://github.com/MaksymStoianov/apps-script-utils/commit/6d4caa26426b972e84e32707a68c02f47c7eaed7)), closes [#341](https://github.com/MaksymStoianov/apps-script-utils/issues/341)
* **sheet:** add requireValidSpreadsheetId ([d276edb](https://github.com/MaksymStoianov/apps-script-utils/commit/d276edb7e7e56c2b374c993c0e1ed05c9fcc92d4))
* **sheet:** add requireValidSpreadsheetId ([0a4c71d](https://github.com/MaksymStoianov/apps-script-utils/commit/0a4c71dc327ae1c2b2c40dcb14d124a7ab8076e9)), closes [#343](https://github.com/MaksymStoianov/apps-script-utils/issues/343)
* **sheet:** return an empty array from parseA1Notations for empty input ([e711502](https://github.com/MaksymStoianov/apps-script-utils/commit/e711502f7fb16c5d30b26836956d8e477c046424)), closes [#381](https://github.com/MaksymStoianov/apps-script-utils/issues/381)
* **slide:** add convertRichTextToMarkdown ([56b4339](https://github.com/MaksymStoianov/apps-script-utils/commit/56b433986e0a4df82c822eb334e1934859c07891)), closes [#498](https://github.com/MaksymStoianov/apps-script-utils/issues/498)
* **slide:** add nonPresentation guard ([dce1bf4](https://github.com/MaksymStoianov/apps-script-utils/commit/dce1bf4158d8a242e7fd47ab239981ce01871bf5))
* **slide:** add nonPresentation guard ([3efa074](https://github.com/MaksymStoianov/apps-script-utils/commit/3efa074f504c836588931bf7931c6b8c623afcc8)), closes [#347](https://github.com/MaksymStoianov/apps-script-utils/issues/347)
* **slide:** add nonSlide guard ([e59910f](https://github.com/MaksymStoianov/apps-script-utils/commit/e59910fa6f12f721c87df755141f7f9322db9535))
* **slide:** add nonSlide guard ([948ca5f](https://github.com/MaksymStoianov/apps-script-utils/commit/948ca5f756630d7130076067a59df4eadff2a9ee)), closes [#346](https://github.com/MaksymStoianov/apps-script-utils/issues/346)
* **slide:** add nonValidPresentationId guard ([807d638](https://github.com/MaksymStoianov/apps-script-utils/commit/807d638c1bdf08a23b7be5653f3cc5c1e213f01c))
* **slide:** add nonValidPresentationId guard ([779fe5e](https://github.com/MaksymStoianov/apps-script-utils/commit/779fe5e91e0aaa2681ff6091649e576fd73262b5)), closes [#351](https://github.com/MaksymStoianov/apps-script-utils/issues/351)
* **slide:** add nonValidSlideId guard ([c049874](https://github.com/MaksymStoianov/apps-script-utils/commit/c049874447beeca7ec9d9a879865b35224bfa751))
* **slide:** add nonValidSlideId guard ([93c1db4](https://github.com/MaksymStoianov/apps-script-utils/commit/93c1db4d4ede09b8028777a4c25b9feecc417924)), closes [#349](https://github.com/MaksymStoianov/apps-script-utils/issues/349)
* **slide:** add requirePresentation ([43ce438](https://github.com/MaksymStoianov/apps-script-utils/commit/43ce43833bbcb9b6594b1cd082d5c5542058bb2c))
* **slide:** add requirePresentation ([a5091ea](https://github.com/MaksymStoianov/apps-script-utils/commit/a5091ea18fde6cb174a8d56126ecaf82fa3e7e3d)), closes [#348](https://github.com/MaksymStoianov/apps-script-utils/issues/348)
* **slide:** add requireValidPresentationId ([f70661c](https://github.com/MaksymStoianov/apps-script-utils/commit/f70661c722470b2b1edeb888b79d942b340df34b))
* **slide:** add requireValidPresentationId ([1d3750f](https://github.com/MaksymStoianov/apps-script-utils/commit/1d3750f0cc5ed799044963379ae31ba52c894248)), closes [#352](https://github.com/MaksymStoianov/apps-script-utils/issues/352)
* **slide:** add requireValidSlideId ([59d5304](https://github.com/MaksymStoianov/apps-script-utils/commit/59d5304b6732d8d4f23198456366f3f25ab922eb))
* **slide:** add requireValidSlideId ([494781d](https://github.com/MaksymStoianov/apps-script-utils/commit/494781da2723286f7e4cdc7a54f96d64305242e6)), closes [#350](https://github.com/MaksymStoianov/apps-script-utils/issues/350)
* **time:** add diff ([7ca57b1](https://github.com/MaksymStoianov/apps-script-utils/commit/7ca57b19c261edacbc3e58e3830ff379ddaaa0d6)), closes [#278](https://github.com/MaksymStoianov/apps-script-utils/issues/278)
* **time:** add getDaysInMonth ([e21ed43](https://github.com/MaksymStoianov/apps-script-utils/commit/e21ed43c49278bee9a21f518aec2d0756cea8feb)), closes [#279](https://github.com/MaksymStoianov/apps-script-utils/issues/279)
* **time:** add getDaysLeftInMonth ([10a85f1](https://github.com/MaksymStoianov/apps-script-utils/commit/10a85f19070fbb5fbfcf81cf49aecdd54c7b9180)), closes [#280](https://github.com/MaksymStoianov/apps-script-utils/issues/280)
* **time:** add offset ([5621a9d](https://github.com/MaksymStoianov/apps-script-utils/commit/5621a9d5c30c72523f9fd8579cb52fa62c180d14)), closes [#281](https://github.com/MaksymStoianov/apps-script-utils/issues/281)
* **time:** add StopWatch ([a7251f4](https://github.com/MaksymStoianov/apps-script-utils/commit/a7251f41eab63712d70f54ce776d728be4fc6fda))
* **time:** add StopWatch ([7c7cb82](https://github.com/MaksymStoianov/apps-script-utils/commit/7c7cb828c5cc48aad55a8004f967ba2add88ead1)), closes [#462](https://github.com/MaksymStoianov/apps-script-utils/issues/462)
* **ui:** add nonHtmlOutput guard ([c78a09c](https://github.com/MaksymStoianov/apps-script-utils/commit/c78a09c141098a6f6af54859495d137fb4c68fce))
* **ui:** add nonHtmlOutput guard ([9e770a3](https://github.com/MaksymStoianov/apps-script-utils/commit/9e770a300df539452405b7415ad280f77954ae5f)), closes [#321](https://github.com/MaksymStoianov/apps-script-utils/issues/321)
* **ui:** add nonTextOutput guard ([27fd2f5](https://github.com/MaksymStoianov/apps-script-utils/commit/27fd2f58cb0fc25416b418490fb8bf6311dbc2d3))
* **ui:** add nonTextOutput guard ([b32148c](https://github.com/MaksymStoianov/apps-script-utils/commit/b32148ce10b0841b1f42d657395e4da0aed15c6f)), closes [#322](https://github.com/MaksymStoianov/apps-script-utils/issues/322)
* **ui:** add nonUi guard ([a6a84fe](https://github.com/MaksymStoianov/apps-script-utils/commit/a6a84fee92cf2c8a6ce679b79e91784b001daf88))
* **ui:** add nonUi guard ([ae4f698](https://github.com/MaksymStoianov/apps-script-utils/commit/ae4f6981838d2fce8869f93bd5f153764c3f87cc)), closes [#323](https://github.com/MaksymStoianov/apps-script-utils/issues/323)
* **ui:** add requireHtmlOutput ([b73b2aa](https://github.com/MaksymStoianov/apps-script-utils/commit/b73b2aa39b4a3a5402c20edb02d72381014b11bb))
* **ui:** add requireHtmlOutput ([0019c57](https://github.com/MaksymStoianov/apps-script-utils/commit/0019c5712fad5c37cd8b0f00d38dd58dc083b8a6)), closes [#324](https://github.com/MaksymStoianov/apps-script-utils/issues/324)
* **ui:** add requireTextOutput ([6324c68](https://github.com/MaksymStoianov/apps-script-utils/commit/6324c68c27f41b91269a9a705b56b95fb351053b))
* **ui:** add requireTextOutput ([4de6173](https://github.com/MaksymStoianov/apps-script-utils/commit/4de61736e494f7bb025c26a28c2d98932696b437)), closes [#325](https://github.com/MaksymStoianov/apps-script-utils/issues/325)
* **ui:** add requireUi ([461580d](https://github.com/MaksymStoianov/apps-script-utils/commit/461580d675de5aa46e70fbe668c005652877f81e))
* **ui:** add requireUi ([4bd73ef](https://github.com/MaksymStoianov/apps-script-utils/commit/4bd73efcf43f2b9cf3f04a3a2ba206afaae3956b)), closes [#326](https://github.com/MaksymStoianov/apps-script-utils/issues/326)


### Bug Fixes

* **appsscript:** drop the stale requireHtmlOutput placeholder ([3c243da](https://github.com/MaksymStoianov/apps-script-utils/commit/3c243dae6323079c911f12fbb2fcf3d91c14ff70)), closes [#324](https://github.com/MaksymStoianov/apps-script-utils/issues/324)
* **build:** merge the translated reference tables with the driver too ([0feaf26](https://github.com/MaksymStoianov/apps-script-utils/commit/0feaf266f216f38e852ebbee0d9b0cd6c8df27b4)), closes [#531](https://github.com/MaksymStoianov/apps-script-utils/issues/531)
* **build:** pair reference tables by their heading, not their position ([1f0f152](https://github.com/MaksymStoianov/apps-script-utils/commit/1f0f152afc9d1e06bf84ace34c1c6bbe01057370)), closes [#486](https://github.com/MaksymStoianov/apps-script-utils/issues/486)
* **build:** recognise a placeholder that carries a signature ([2eb6150](https://github.com/MaksymStoianov/apps-script-utils/commit/2eb615076042d0c938b7fdf66a761fc5841ae730)), closes [#485](https://github.com/MaksymStoianov/apps-script-utils/issues/485)
* **build:** stop the module-index driver duplicating an export ([586ec0a](https://github.com/MaksymStoianov/apps-script-utils/commit/586ec0a4de316de3430be1a77464ad958ed8e65f)), closes [#482](https://github.com/MaksymStoianov/apps-script-utils/issues/482)
* **ci:** split the Writerside module path from the instance locator ([f36e825](https://github.com/MaksymStoianov/apps-script-utils/commit/f36e825ddda6a31e208af2cdb3e4633718ff1607))
* export the fifty-nine functions missing from the module indexes ([7c9a00e](https://github.com/MaksymStoianov/apps-script-utils/commit/7c9a00e3f36d750c298e72c757af7c1b681390e2))
* **lang:** drop the duplicated require2DArray export ([d22f81f](https://github.com/MaksymStoianov/apps-script-utils/commit/d22f81fef85c807a03b1b6c8550f69f92c28826c)), closes [#482](https://github.com/MaksymStoianov/apps-script-utils/issues/482)
* **lang:** drop the stale namespace placeholder ([848d5ca](https://github.com/MaksymStoianov/apps-script-utils/commit/848d5cafd7b9bbd840c8802cc67a5d624cd045c3)), closes [#483](https://github.com/MaksymStoianov/apps-script-utils/issues/483)
* **lang:** drop the stale require2DArray placeholder ([b5a68cd](https://github.com/MaksymStoianov/apps-script-utils/commit/b5a68cdd69ff5a701b23ad4b424017655b314863)), closes [#308](https://github.com/MaksymStoianov/apps-script-utils/issues/308)
* **lang:** drop the stale requireNonArray placeholder ([d5a3f84](https://github.com/MaksymStoianov/apps-script-utils/commit/d5a3f84945b638c02fcfcf0d203bf1653e21cf19)), closes [#231](https://github.com/MaksymStoianov/apps-script-utils/issues/231)
* **lang:** export nonSymbol from the base module ([839adbc](https://github.com/MaksymStoianov/apps-script-utils/commit/839adbcfd896d6ab71068b7bf2d3018881438653))
* **lang:** make is2DArray return false instead of throwing ([6283822](https://github.com/MaksymStoianov/apps-script-utils/commit/62838224e761f58ce0cbed7dbfcda1f6b3e5e79a))
* **lang:** make is2DArray return false instead of throwing ([1515a20](https://github.com/MaksymStoianov/apps-script-utils/commit/1515a207baa478b6844e20cb2c7a6ff5f1efe3f7))
* **lang:** make isConsistent2DArray return false instead of throwing ([c6980df](https://github.com/MaksymStoianov/apps-script-utils/commit/c6980df9f2b35385bc4703c60df0370580efd512))
* **lang:** make isConsistent2DArray return false instead of throwing ([d1b9d16](https://github.com/MaksymStoianov/apps-script-utils/commit/d1b9d16d7d54e36b8bd77c3f77e495388dd27e30)), closes [#362](https://github.com/MaksymStoianov/apps-script-utils/issues/362)
* **lang:** make isFunction recognise async generator functions ([e20f5e4](https://github.com/MaksymStoianov/apps-script-utils/commit/e20f5e43b99a812db05ca6c9accff6c911d76863))
* **lang:** make isFunction recognise async generator functions ([657f512](https://github.com/MaksymStoianov/apps-script-utils/commit/657f5126384d3d2495d9f126efdecd095f8ea9d5)), closes [#189](https://github.com/MaksymStoianov/apps-script-utils/issues/189)
* **net:** make isAbsolute return false instead of throwing ([820cd2a](https://github.com/MaksymStoianov/apps-script-utils/commit/820cd2ad343b2e72d47e3b2fc87b772bda1d65e4))
* **net:** make isAbsolute return false instead of throwing ([fc35d3f](https://github.com/MaksymStoianov/apps-script-utils/commit/fc35d3fd48e010c8b09d60f61efe4325c9bb7ffb)), closes [#389](https://github.com/MaksymStoianov/apps-script-utils/issues/389)
* **sheet:** append after the last populated column, on a sheet or in a range ([d014a45](https://github.com/MaksymStoianov/apps-script-utils/commit/d014a45564e6dd4af0868f30846e41f3cf407a9f)), closes [#450](https://github.com/MaksymStoianov/apps-script-utils/issues/450)
* **sheet:** apply the real sheet name rules in isValidSheetName ([a31dd02](https://github.com/MaksymStoianov/apps-script-utils/commit/a31dd026437320719f3421f532ed464125537695)), closes [#413](https://github.com/MaksymStoianov/apps-script-utils/issues/413)
* **sheet:** drop the unused import and unreachable branch in parseA1Notations ([88d8a3b](https://github.com/MaksymStoianov/apps-script-utils/commit/88d8a3b099f440ae85de9961c0132105bf88dd12))
* **sheet:** drop the unused import and unreachable branch in parseA1Notations ([79f1046](https://github.com/MaksymStoianov/apps-script-utils/commit/79f1046a56611dab3abdcdd967783de62ad036d5)), closes [#192](https://github.com/MaksymStoianov/apps-script-utils/issues/192)
* **sheet:** export getColumnLetterByPosition ([8ab399c](https://github.com/MaksymStoianov/apps-script-utils/commit/8ab399c7cf06be3d8c2ace4e95a3594bbf4214e4))
* **sheet:** let the original error through when a write fails ([9c3d5e2](https://github.com/MaksymStoianov/apps-script-utils/commit/9c3d5e211066661c0ebdc8236b9146c85aeb48b8)), closes [#448](https://github.com/MaksymStoianov/apps-script-utils/issues/448)
* **sheet:** make isCellGridRange return false instead of throwing ([9166ec7](https://github.com/MaksymStoianov/apps-script-utils/commit/9166ec7a652409feebcd566a01190097bcf04859))
* **sheet:** make isCellGridRange return false instead of throwing ([68b3ddf](https://github.com/MaksymStoianov/apps-script-utils/commit/68b3ddfeb61f36219abe842695f802dd8a75f96e))
* **sheet:** make isGridRangeSameDimensions return false instead of throwing ([60e2562](https://github.com/MaksymStoianov/apps-script-utils/commit/60e25626769d76e1a96dc50b1a34fa6fde70388b))
* **sheet:** make isGridRangeSameDimensions return false instead of throwing ([9f35ab8](https://github.com/MaksymStoianov/apps-script-utils/commit/9f35ab8b6320ed73d008fff52acf6004062de185))
* **sheet:** restrict isValidSheetId to non-negative integers ([068a659](https://github.com/MaksymStoianov/apps-script-utils/commit/068a659aced00610ca2e35936ce8607333745e27))
* **sheet:** return position 1 for column A in getColumnPositionByLetter ([2cb8765](https://github.com/MaksymStoianov/apps-script-utils/commit/2cb876520e32fc24775b40b3de2b23d8c939c4b5))
* **sheet:** skip the font size when a run has no explicit size ([6432ea6](https://github.com/MaksymStoianov/apps-script-utils/commit/6432ea63e2ed073f6b33510a6e7006b57b26bf42)), closes [#469](https://github.com/MaksymStoianov/apps-script-utils/issues/469)
* **sheet:** take a sheet or a range in appendRow ([794b6cf](https://github.com/MaksymStoianov/apps-script-utils/commit/794b6cf648ac87d6b88a81fe3124ef946ee4c143)), closes [#504](https://github.com/MaksymStoianov/apps-script-utils/issues/504)
* **sheet:** take a sheet or a range in appendRows ([b7f99e1](https://github.com/MaksymStoianov/apps-script-utils/commit/b7f99e1ef0e7e8951992203099ececd00476b242)), closes [#505](https://github.com/MaksymStoianov/apps-script-utils/issues/505)
* **sheet:** take a sheet or a range in clearColumnsByConditional ([7bf6063](https://github.com/MaksymStoianov/apps-script-utils/commit/7bf6063cd028c85a571412c69b6ad34b9ed1ccc7)), closes [#518](https://github.com/MaksymStoianov/apps-script-utils/issues/518)
* **sheet:** take a sheet or a range in clearRowsByConditional ([72626ad](https://github.com/MaksymStoianov/apps-script-utils/commit/72626adfd58439ec3d9f685bdc73a60e6ba4e67f)), closes [#517](https://github.com/MaksymStoianov/apps-script-utils/issues/517)
* **sheet:** take a sheet or a range in deleteColumnsByConditional ([de4b3e5](https://github.com/MaksymStoianov/apps-script-utils/commit/de4b3e54b5ec78149168e7f0c3b130f9adae9f94)), closes [#520](https://github.com/MaksymStoianov/apps-script-utils/issues/520)
* **sheet:** take a sheet or a range in deleteRowsByConditional ([6f9cb20](https://github.com/MaksymStoianov/apps-script-utils/commit/6f9cb208573c084cf80cd3731606b12134a065f0)), closes [#519](https://github.com/MaksymStoianov/apps-script-utils/issues/519)
* **sheet:** take a sheet or a range in getValues ([d442674](https://github.com/MaksymStoianov/apps-script-utils/commit/d442674af721648edeefb8db71e3301aad902737)), closes [#521](https://github.com/MaksymStoianov/apps-script-utils/issues/521)
* **sheet:** take a sheet or a range in prependColumn ([cff86f7](https://github.com/MaksymStoianov/apps-script-utils/commit/cff86f794c8b391d431156d7779c8788f3927628)), closes [#508](https://github.com/MaksymStoianov/apps-script-utils/issues/508)
* **sheet:** take a sheet or a range in prependColumns ([2fc26a9](https://github.com/MaksymStoianov/apps-script-utils/commit/2fc26a9ce23e9f4d4f5f3bfd22814bfcf8886177)), closes [#509](https://github.com/MaksymStoianov/apps-script-utils/issues/509)
* **sheet:** take a sheet or a range in prependRow ([6bb0e0e](https://github.com/MaksymStoianov/apps-script-utils/commit/6bb0e0e14858da3768c23544b2ef453b4980c5d1)), closes [#506](https://github.com/MaksymStoianov/apps-script-utils/issues/506)
* **sheet:** take a sheet or a range in prependRows ([14207ac](https://github.com/MaksymStoianov/apps-script-utils/commit/14207ac1f340f0845a8dab17bcfd4382767e5d64)), closes [#507](https://github.com/MaksymStoianov/apps-script-utils/issues/507)
* **sheet:** take a sheet or a range in updateFormulas ([4ef87dc](https://github.com/MaksymStoianov/apps-script-utils/commit/4ef87dc342a0a08ec7f4d2a622f3f2a17cae7dd5)), closes [#522](https://github.com/MaksymStoianov/apps-script-utils/issues/522)
* **sheet:** validate both arguments of isGridRangeContainedIn and stop throwing ([aa83a74](https://github.com/MaksymStoianov/apps-script-utils/commit/aa83a743b6c799338890765ddcc0f1c275ed1691))
* **sheet:** validate both arguments of isGridRangeContainedIn and stop throwing ([c717431](https://github.com/MaksymStoianov/apps-script-utils/commit/c717431a98e8744af7a4c43e53143070b3093327)), closes [#412](https://github.com/MaksymStoianov/apps-script-utils/issues/412)
* **sheet:** validate the shape of a spreadsheet id, not just its length ([8796c4c](https://github.com/MaksymStoianov/apps-script-utils/commit/8796c4c027960661a7d84d06e1485f1c970c0f51))
* **sheet:** write a column, not a row, in appendColumn ([f99fe17](https://github.com/MaksymStoianov/apps-script-utils/commit/f99fe17f3acfcec1241fea9fac1a35339ba1ce0b)), closes [#503](https://github.com/MaksymStoianov/apps-script-utils/issues/503)
* **slide:** reject absent or non-string input in convertMarkdownToRichText ([a80ae2f](https://github.com/MaksymStoianov/apps-script-utils/commit/a80ae2f37c2cd30dd5494a8b33b60536e4fea013)), closes [#451](https://github.com/MaksymStoianov/apps-script-utils/issues/451)
* **slide:** take the index first in getSlideByIndex, and default to the active presentation ([34b8f02](https://github.com/MaksymStoianov/apps-script-utils/commit/34b8f02ba4003619cd34245fe4b7444dd961fd4d)), closes [#449](https://github.com/MaksymStoianov/apps-script-utils/issues/449)
* **slide:** take the presentation first in getSlideIndex ([4a0ae57](https://github.com/MaksymStoianov/apps-script-utils/commit/4a0ae57ccb86282ddcdbec9ae8ffa6f5899d3a7d)), closes [#470](https://github.com/MaksymStoianov/apps-script-utils/issues/470)
* **slide:** take the slide first in getSlideIndex, and default to the active presentation ([b3bed1e](https://github.com/MaksymStoianov/apps-script-utils/commit/b3bed1e66a34cb57e23f08dd5f7148d03d710090)), closes [#532](https://github.com/MaksymStoianov/apps-script-utils/issues/532)

## [1.10.0](https://github.com/MaksymStoianov/apps-script-utils/compare/v1.9.0...v1.10.0) (2026-08-19)


### Features

* **sheet:** allow custom error messages in parseA1Notations and add JSDoc documentation ([e210153](https://github.com/MaksymStoianov/apps-script-utils/commit/e210153a62bfb02bd367e81faa4146634897cd1e))

## [1.9.0](https://github.com/MaksymStoianov/apps-script-utils/compare/v1.8.1...v1.9.0) (2026-03-17)


### Features

* improve tsconfig and development environment ([23e4c15](https://github.com/MaksymStoianov/apps-script-utils/commit/23e4c1555030ccbb51c5e520aefacf8c3c70f4e7))


### Bug Fixes

* format ([c4e0f5c](https://github.com/MaksymStoianov/apps-script-utils/commit/c4e0f5c51501cfc07552408ded723f02b611eef9))

## [1.8.1](https://github.com/MaksymStoianov/apps-script-utils/compare/v1.8.0...v1.8.1) (2026-03-17)


### Bug Fixes

* bump version to 1.8.2 ([dfdd61f](https://github.com/MaksymStoianov/apps-script-utils/commit/dfdd61f467c7880a01a1f5ff27b66ca07439a9af))

## [1.8.0](https://github.com/MaksymStoianov/apps-script-utils/compare/v1.7.0...v1.8.0) (2026-03-17)


### Features

* enhance Apps Script utilities (admin, base, sheet, slide, ui) ([853043b](https://github.com/MaksymStoianov/apps-script-utils/commit/853043b48d50dfabf1cdabba9e8487be0d575d23))
* expand exception hierarchy ([2a4e1bd](https://github.com/MaksymStoianov/apps-script-utils/commit/2a4e1bd9f8ba815bb408d9591176194b0229e898))
* update and extend language utilities ([e79db8f](https://github.com/MaksymStoianov/apps-script-utils/commit/e79db8f0fef8e1e696eb07d8ac0327d97a809b90))
* update html, json, net and time utilities ([5ce412e](https://github.com/MaksymStoianov/apps-script-utils/commit/5ce412ef3649da7faa2fbd8856ce0e277f41ddeb))


### Bug Fixes

* **appsscript:** resolve ReDoS vulnerability in parseA1Notation ([bd4ea1a](https://github.com/MaksymStoianov/apps-script-utils/commit/bd4ea1a9e358a125480dd5f0beb7a3ddffd26aa8))
* **coverage:** resolve CodeQL DOM XSS warning in sorter.js ([f82bcfe](https://github.com/MaksymStoianov/apps-script-utils/commit/f82bcfeafeffa37e99492fef8832c49c02358066))
* package.json ([89e0eeb](https://github.com/MaksymStoianov/apps-script-utils/commit/89e0eeb411ca52c337bb4da574af668fec9eb6ba))
* package.json ([146e091](https://github.com/MaksymStoianov/apps-script-utils/commit/146e091e2a5c96591a2400ddf2fbd42e64cebfd8))

## [1.7.0](https://github.com/MaksymStoianov/apps-script-utils/compare/v1.6.1...v1.7.0) (2026-01-07)

### Features

- **appsscript/sheet/getSheetById:** Update getSheetById utility
  function ([3c31a01](https://github.com/MaksymStoianov/apps-script-utils/commit/3c31a01f457d890718a88be73fc84d4a15c63c0f))
- **appsscript/sheet/getSheetByIndex:** Add getSheetByIndex utility
  function ([857ea01](https://github.com/MaksymStoianov/apps-script-utils/commit/857ea0182b990fb8254a3f3ca4d9d5c1686315d6))
- **lang/number/nonNegative:** Add nonNegative utility
  function ([95da638](https://github.com/MaksymStoianov/apps-script-utils/commit/95da6382723fb8392abe6e1ec65588098d62fbbf))

## [1.6.1](https://github.com/MaksymStoianov/apps-script-utils/compare/v1.6.0...v1.6.1) (2025-11-01)

### Bug Fixes

- update
  package.json ([a180666](https://github.com/MaksymStoianov/apps-script-utils/commit/a180666a82a16b9c7ae5dae10dc38d802515010d))
- update
  package.json ([87d27ac](https://github.com/MaksymStoianov/apps-script-utils/commit/87d27ac131bfdef5adb07dafc4d637bb105ff636))

## [1.6.0](https://github.com/MaksymStoianov/appsscript-utils/compare/v1.5.1...v1.6.0) (2025-10-11)

### Features

- **appsscript/sheet:** Add extractRangeFromA1Notation utility
  function ([55f1c99](https://github.com/MaksymStoianov/appsscript-utils/commit/55f1c99cc606d6f852286909e0513ea6de221113))
- **appsscript/sheet:** Add extractSheetNameFromA1Notation utility
  function ([6f9dd6f](https://github.com/MaksymStoianov/appsscript-utils/commit/6f9dd6fffbb5136918512ae0d1c13e82a6a56c50))
- **appsscript/sheet:** Add parseA1Notations utility
  function ([c2ab5ef](https://github.com/MaksymStoianov/appsscript-utils/commit/c2ab5ef73772e89bdd3229e91be71b0b1e8853b5))
- **appsscript/sheet:** Add parseA1Notations utility
  function ([cd4440c](https://github.com/MaksymStoianov/appsscript-utils/commit/cd4440c35d315c3c3933ca5406d219574ee096d2))
- **appsscript/sheet:** Add updateSheetNameInA1Notation utility
  function ([9fec360](https://github.com/MaksymStoianov/appsscript-utils/commit/9fec3600b3fef467d502b8996141558ea7d9f384))
- **appsscript/sheet:** Normalize parseA1Notation to exclude sheet name from a1Notation
  property ([1fea5a0](https://github.com/MaksymStoianov/appsscript-utils/commit/1fea5a07ebde235b3aed0748a1dacac8b9365ec5))

### Bug Fixes

- **lang:** Improve string handling in isEmpty with 'strict'
  mode ([9ceb4e3](https://github.com/MaksymStoianov/appsscript-utils/commit/9ceb4e35b1c39e65f909e7eeab3769112e308d8a))

## [1.5.1](https://github.com/MaksymStoianov/appsscript-utils/compare/v1.5.0...v1.5.1) (2025-09-09)

### Bug Fixes

-

## imports ([14698eb](https://github.com/MaksymStoianov/appsscript-utils/commit/14698eb18da88686f50b855637b9b454b4465473))

imports ([6ed4266](https://github.com/MaksymStoianov/appsscript-utils/commit/6ed426619eb071006e0cd0dc79d1d5794fd4256e))

## [1.5.0](https://github.com/MaksymStoianov/appsscript-utils/compare/v1.4.0...v1.5.0) (2025-09-09)

### Features

- **refactor:** add new helpers and
  exceptions ([984cff7](https://github.com/MaksymStoianov/appsscript-utils/commit/984cff70df985cabdebaf8aa05f1339d1bf2e535))

## [1.4.0](https://github.com/MaksymStoianov/appsscript-utils/compare/v1.3.0...v1.4.0) (2025-09-03)

### Features

- **appsscript/admin/isAdmin:** Add isAdmin utility
  function ([a4dec07](https://github.com/MaksymStoianov/appsscript-utils/commit/a4dec07d6803baf5975f5f21dffb3c65e3f64e15))
- **appsscript/sheets/sortSheets:** Add sortSheets utility
  function ([669987f](https://github.com/MaksymStoianov/appsscript-utils/commit/669987f8ad89033d9e97900a0cda85fd2abdae0b))
- **base/nonFunction:** Add nonFunction utility
  function ([505c685](https://github.com/MaksymStoianov/appsscript-utils/commit/505c68542b65583218cd4cb75c228cefe763ad22))
- **base/nonUndefined:** Add nonUndefined utility
  function ([aeb1273](https://github.com/MaksymStoianov/appsscript-utils/commit/aeb1273480d238e1978af25a8ac1e6f4ea71921d))
- **base:** Add isArray and nonArray utility
  functions ([ef073d3](https://github.com/MaksymStoianov/appsscript-utils/commit/ef073d3250a00ca0357a5ca12f558df9caa066d5))
- **base:** Add nonScalar and nonSymbol utility
  function ([92abd17](https://github.com/MaksymStoianov/appsscript-utils/commit/92abd1717d9371c289cc9da368dbbf5b5b3ea888))

## [1.3.0](https://github.com/MaksymStoianov/appsscript-utils/compare/v1.2.0...v1.3.0) (2025-09-02)

### Features

- **appsscript/sheets/nonSheet:** Add nonSheet utility
  function ([adab35c](https://github.com/MaksymStoianov/appsscript-utils/commit/adab35cbe0561ed520bdf4f06b3fb8e60d0e3f17))

### Bug Fixes

-

## imports ([d8b407c](https://github.com/MaksymStoianov/appsscript-utils/commit/d8b407c46eb74a0a7277b435eb22eb7477f830eb))

imports ([528ecc1](https://github.com/MaksymStoianov/appsscript-utils/commit/528ecc1580f84dfe26f4676eb8fbb420ba7cf500))

- src/base/index.ts add
  nonEmpty ([be7c474](https://github.com/MaksymStoianov/appsscript-utils/commit/be7c47444fb462c7fc71fe15e8fc5792a28f3dbc))

## [1.2.0](https://github.com/MaksymStoianov/appsscript-utils/compare/v1.1.1...v1.2.0) (2025-09-02)

### Features

- **base/isFunctionLike:** Add isFunctionLike utility
  function ([0f3177b](https://github.com/MaksymStoianov/appsscript-utils/commit/0f3177b5857a319c5eac51acd8d5d80a8fcc50fb))
- **base/nonBoolean:** Add nonBoolean utility
  function ([1c0192c](https://github.com/MaksymStoianov/appsscript-utils/commit/1c0192c14ca2f2a8e6e3120716f8c17c7e440ca7))
- **base/nonEmpty:** Add nonEmpty utility
  function ([d4bf710](https://github.com/MaksymStoianov/appsscript-utils/commit/d4bf7101d900923decee3261d048ede7d1f41108))

### Bug Fixes

- lint ([db80175](https://github.com/MaksymStoianov/appsscript-utils/commit/db80175b87a03a056c1900d8382d786063511566))
- **readme:** fix link in
  README.md ([62a4dd8](https://github.com/MaksymStoianov/appsscript-utils/commit/62a4dd897b93951452edc89d2ed2568db044e4de))

## [1.1.1](https://github.com/MaksymStoianov/appsscript-utils/compare/v1.1.0...v1.1.1) (2025-08-31)

### Bug Fixes

- **readme:** update
  README.md ([5f834de](https://github.com/MaksymStoianov/appsscript-utils/commit/5f834ded6e269349bbe564abac9603456c7b823d))
- **readme:** update
  README.md ([531eb9e](https://github.com/MaksymStoianov/appsscript-utils/commit/531eb9e5d195df4f0806e25a13e98ea607331f45))

## [1.1.0](https://github.com/MaksymStoianov/appsscript-utils/compare/v1.0.1...v1.1.0) (2025-08-31)

### Features

- **readme:** update
  links ([f2d52f3](https://github.com/MaksymStoianov/appsscript-utils/commit/f2d52f32175a345faf137a57c11c79e60eb5f264))
- **readme:** update
  links ([29e6842](https://github.com/MaksymStoianov/appsscript-utils/commit/29e684262beaa930ef47f25bfef0bad2381c003c))
- **readme:** update
  links ([94fe0ca](https://github.com/MaksymStoianov/appsscript-utils/commit/94fe0ca45ac06f3408c1d13440067cd232942ccf))

### Bug Fixes

- **readme:** fix
  bugs ([1de5993](https://github.com/MaksymStoianov/appsscript-utils/commit/1de59937c5da818caf81d201c1cadd66888e3de8))

## [1.0.1](https://github.com/MaksymStoianov/appsscript-utils/compare/v1.0.0...v1.0.1) (2025-07-25)

### Bug Fixes

- add
  .github/FUNDING.yml ([924e13b](https://github.com/MaksymStoianov/appsscript-utils/commit/924e13bc86314c7ec20b4f7d03d96865e6510d66))
- hashCode.ts and refactor
  package.json ([2fb9c16](https://github.com/MaksymStoianov/appsscript-utils/commit/2fb9c161b2dc3e0c9985b36d373e3e4272c32928))

## 1.0.0 (2025-07-25)

### Features

- **abstract/Class:**
  add ([b1663bb](https://github.com/MaksymStoianov/appsscript-utils/commit/b1663bbcd764f4b5b24962cceb7241f63481612e))
- add
  src/appsscript/getByteSize.ts ([4ebd4b6](https://github.com/MaksymStoianov/appsscript-utils/commit/4ebd4b67ab7ebb3f6711331bb34974df48118fce))
- add
  src/appsscript/isHtmlOutput.ts ([6a74ac5](https://github.com/MaksymStoianov/appsscript-utils/commit/6a74ac5c96c4b66e1380423582622a1451718c06))
- add
  src/appsscript/isTextOutput.ts ([ffa1559](https://github.com/MaksymStoianov/appsscript-utils/commit/ffa1559968978e6bf9d12e0da3ea314942700005))
- add
  src/appsscript/isUi.ts ([f7b3a56](https://github.com/MaksymStoianov/appsscript-utils/commit/f7b3a562b2841f8572d088e24d86b5d4e7079cc5))
- add src/appsscript/sheets/appendColumns.ts and
  src/appsscript/sheets/appendColumn.ts ([96e8c4c](https://github.com/MaksymStoianov/appsscript-utils/commit/96e8c4c84664eeafadec8a389095996b9f280b2c))
- add src/appsscript/sheets/appendRows.ts and
  src/appsscript/sheets/appendRow.ts ([9b9b6e0](https://github.com/MaksymStoianov/appsscript-utils/commit/9b9b6e0d6eb66905da26d17a308b01b22a250296))
- add
  src/appsscript/sheets/convertRichTextToHtml.ts ([be741bd](https://github.com/MaksymStoianov/appsscript-utils/commit/be741bdaeccfc3776c22c55d4db43e0f0f638823))
- add
  src/appsscript/sheets/highlightHtml.ts ([2b40988](https://github.com/MaksymStoianov/appsscript-utils/commit/2b40988cfd26b165dedd73307f888cfbf75087e4))
- add src/appsscript/sheets/prependRow.ts and
  prependRows.ts ([dfcec47](https://github.com/MaksymStoianov/appsscript-utils/commit/dfcec478168cd1da554188ffad44b19e52fd6fdd))
- add
  src/base/stringifyJson.ts ([91896e7](https://github.com/MaksymStoianov/appsscript-utils/commit/91896e7de82121f652c053205a8802205bd90d69))
- **hashCode:** Support hashing of any input
  type ([3d23ad2](https://github.com/MaksymStoianov/appsscript-utils/commit/3d23ad2cdb9eba0bb24bb9f8866ebd0536c0a59a))
-

## src/appsscript/checkMultipleAccount.ts ([1e96039](https://github.com/MaksymStoianov/appsscript-utils/commit/1e960393f9b58fe5e8b6bc5d06e642d33561cb73))

## src/appsscript/sheets/isSheet.ts ([bf7b2d3](https://github.com/MaksymStoianov/appsscript-utils/commit/bf7b2d394f730e3ce431c944537135100221b0a4))

## src/appsscript/sheets/isSpreadsheet.ts ([1217166](https://github.com/MaksymStoianov/appsscript-utils/commit/1217166e87592af4380ef00a1c14b923d3888d1c))

## src/appsscript/sheets/isSpreadsheet.ts ([61de161](https://github.com/MaksymStoianov/appsscript-utils/commit/61de161bec2358c02783c4b2f4fbd430ea5d21f0))

## src/appsscript/sheets/isTextStyle.ts ([5d27058](https://github.com/MaksymStoianov/appsscript-utils/commit/5d270581b6002ad120df110879ad858ce897ec89))

## src/appsscript/sheets/isValidSheetName.ts ([f843bde](https://github.com/MaksymStoianov/appsscript-utils/commit/f843bdea6f00228bc3bc7dcfb4859495a30cdc57))

## src/appsscript/sheets/isValidSpreadsheetId.ts ([053de55](https://github.com/MaksymStoianov/appsscript-utils/commit/053de555102d5efbc4b853fdad7f60314d500d1a))

## src/appsscript/sheets/parseA1Notation.ts ([168a2e2](https://github.com/MaksymStoianov/appsscript-utils/commit/168a2e207d4630016371add9c6509485c09ba7ec))

src/appsscript/sheets/toA1Notation.ts ([075fb3c](https://github.com/MaksymStoianov/appsscript-utils/commit/075fb3c81e7d855aff01f34e6a12a88b2f111e6c))
