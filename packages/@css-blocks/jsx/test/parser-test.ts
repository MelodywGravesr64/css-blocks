import mock from "@css-blocks/build/dist/src/testing/transient-fs";
import { assert } from "chai";
import { suite, test } from "mocha-typescript";

import { testParse as parse, testParseFile as parseFile } from "./util";

@suite("Parser Test")
export class Test {
  after() {
    mock.restore();
  }

  @test "parses when provided a string"() {
    return parse(`
      class Foo {
        method(){
          1;
        }
      }
    `).then((analysis) => {
      assert.ok(analysis);
    });
  }

  @test "parses when provided a path"() {
    mock({
      "bar.js": `class Foo {
        method(){
          1;
        }
      }`,
    });
    return parseFile("bar.js").then((analysis) => {
      assert.ok(analysis);
    });
  }

  @test "parser takes an optional options hash with baseDir"() {
    mock({
      "foo": {
        "bar.js": `class Foo {
          method(){
            1;
          }
        }`,
      },
    });
    return parseFile("bar.js", { baseDir: "foo"}).then((analysis) => {
      assert.ok(analysis);
    });
  }
}
