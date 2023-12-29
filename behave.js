// sbul: simple-basic-uniform-language

var local_variables = {}

function line_part_eval(line_parts, index) {
    var line_part = line_parts[index]

    if (line_part == ".comment") return

    if (line_part[0] == ".") {

        if (line_part == ".array_count:1") {
            return line_part_eval(line_parts, index + 1).length
        }

        if (line_part == ".append:2") {
            local_variables[line_part_eval(line_parts, index + 1)] += line_part_eval(line_parts, index + 2)
        }

        if (line_part == ".console_log:1") {
            var text = line_part_eval(line_parts, index + 1)
            console.log(text)
            stdout.textContent += text
        }

        if (line_part == ".local_variable_set:2") {
            local_variables[line_part_eval(line_parts, index + 1)] = line_part_eval(line_parts, index + 2)
        }

        if (line_part == ".local_variable_get:1") {
            return local_variables[line_part_eval(line_parts, index + 1)]
        }

    } else {
        var json = JSON.parse(line_part)
        if (typeof json == "string") json = json.replace(/\+/g, " ")
        return json
    }
}

function execute_program(program) {

    for (var line of program.trim().split("\n")) {
        var line_parts = line.trim().split(" ")
        line_part_eval(line_parts, 0)
    }

}
