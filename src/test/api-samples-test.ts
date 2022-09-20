import * as DG from 'datagrok-api/dg';
import * as grok from 'datagrok-api/grok';
import {category, expect, test} from '@datagrok-libraries/utils/src/test';


category(`test`, () => {
    grok.dapi.scripts.filter('package.shortName = "ApiSamples"')
    .list()
    .then(function(result) {
        for (let obj of result.slice(0, 20)) {
            let name: string = obj.dart.b;
            let n: number;

            try {
                new DG.Func(obj.dart).apply()
                .then(() => {
                    grok.shell.closeAll();
                });
                n = 1;
                grok.shell.info(`${name}: OK`);
            } catch (e) {
                n = 2;
                grok.shell.error(`${name}: ERROR`);
            }

            test(name, async () => {
                expect(n === 1, true);
            });
        }
    });
});