<?php
/*
 * This document has been generated with
 * https://mlocati.github.io/php-cs-fixer-configurator/#version:2.16.2|configurator
 * you can change this configuration by importing this file.
 */
return PhpCsFixer\Config::create()
    ->setIndent('  ')
    ->setRules([
        'array_syntax' => ['syntax'=>'short'],
        'braces' => ['position_after_functions_and_oop_constructs'=>'same'],
        'align_multiline_comment' => true,
        'array_indentation' => true,
        'binary_operator_spaces' => true,
        'blank_line_after_namespace' => true,
        'blank_line_after_opening_tag' => true,
        'blank_line_before_statement' => true,
        'cast_spaces' => true,
        'class_attributes_separation' => true,
        'class_definition' => true,
        'class_keyword_remove' => true,
        'combine_consecutive_issets' => true,
        'combine_consecutive_unsets' => true,
        'compact_nullable_typehint' => true,
        'concat_space' => true,
        'constant_case' => true,
        'declare_equal_normalize' => true,
        'doctrine_annotation_array_assignment' => true,
        'doctrine_annotation_braces' => true,
        'doctrine_annotation_indentation' => true,
        'doctrine_annotation_spaces' => true,
        'elseif' => true,
        'encoding' => true,
        'escape_implicit_backslashes' => true,
        'explicit_indirect_variable' => true,
        'explicit_string_variable' => true,
        'no_trailing_whitespace_in_comment' => true,
        'class_keyword_remove' => false,
    ])
    ->setFinder(PhpCsFixer\Finder::create()
        ->exclude('vendor')
        ->in(__DIR__)
    )
;